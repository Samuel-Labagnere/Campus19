# frozen_string_literal: true

require 'carmen'

module Spree
  module BaseHelper
    def link_to_cart(text = nil)
      text = text ? h(text) : t('spree.cart')
      css_class = nil

      if current_order.nil? || current_order.item_count.zero?
        text = "#{text}: (#{t('spree.empty')})"
        css_class = 'empty'
      else
        text = "#{text}: (#{current_order.item_count})  <span class='amount'>#{current_order.display_total.to_html}</span>"
        css_class = 'full'
      end

      link_to text.html_safe, spree.cart_path, class: "cart-info #{css_class}"
    end

    # human readable list of variant options
    def variant_options(variant, _options = {})
      variant.options_text
    end

    def custom_variant_to_string(variant)
      values = variant.option_values.includes(:option_type).sort_by do |option_value|
        option_value.option_type.position
      end

      values.to_a.map! do |ov|
        "#{ov.option_type.presentation}: #{ov.presentation}"
      end

      values.join(", ")
    end

    def meta_data
      object = instance_variable_get('@' + controller_name.singularize)
      meta = {}

      if object.is_a? ActiveRecord::Base
        meta[:keywords] = object.meta_keywords if object[:meta_keywords].present?
        meta[:description] = object.meta_description if object[:meta_description].present?
      end

      if meta[:description].blank? && object.is_a?(Spree::Product)
        meta[:description] = truncate(strip_tags(object.description), length: 160, separator: ' ')
      end

      if meta[:keywords].blank? || meta[:description].blank?
        meta.reverse_merge!({
          keywords: current_store.meta_keywords,
          description: current_store.meta_description
        })
      end
      meta
    end

    def meta_data_tags
      meta_data.map do |name, content|
        tag('meta', name: name, content: content)
      end.join("\n")
    end

    def body_class
      @body_class ||= content_for?(:sidebar) ? 'two-col' : 'one-col'
      @body_class
    end

    def logo(image_path = Spree::Config[:logo])
      link_to image_tag(image_path), spree.root_path
    end

    def flash_messages(opts = {})
      ignore_types = ["order_completed"].concat(Array(opts[:ignore_types]).map(&:to_s) || [])

      flash.each do |msg_type, text|
        unless ignore_types.include?(msg_type)
          concat(content_tag(:div, text, class: "flash #{msg_type}"))
        end
      end
      nil
    end

    def taxon_breadcrumbs(taxon, separator = '&nbsp;&raquo;&nbsp;', breadcrumb_class = 'inline')
      return '' if current_page?('/') || taxon.nil?

      crumbs = [[t('spree.home'), spree.root_path]]

      crumbs << [t('spree.products'), products_path]
      if taxon
        crumbs += taxon.ancestors.collect { |ancestor| [ancestor.name, spree.nested_taxons_path(ancestor.permalink)] } unless taxon.ancestors.empty?
        crumbs << [taxon.name, spree.nested_taxons_path(taxon.permalink)]
      end

      separator = raw(separator)

      items = crumbs.each_with_index.collect do |crumb, index|
        content_tag(:li, itemprop: 'itemListElement', itemscope: '', itemtype: 'https://schema.org/ListItem') do
          link_to(crumb.last, itemprop: 'item') do
            content_tag(:span, crumb.first, itemprop: 'name') + tag('meta', { itemprop: 'position', content: (index + 1).to_s }, false, false)
          end + (crumb == crumbs.last ? '' : separator)
        end
      end

      content_tag(:nav, content_tag(:ol, raw(items.map(&:mb_chars).join), class: breadcrumb_class, itemscope: '', itemtype: 'https://schema.org/BreadcrumbList'), id: 'breadcrumbs', class: 'sixteen columns')
    end

    def taxons_tree(root_taxon, current_taxon, max_level = 1)
      return '' if max_level < 1 || root_taxon.children.empty?
      content_tag :ul, class: 'taxons-list' do
        taxons = root_taxon.children.map do |taxon|
          css_class = (current_taxon && current_taxon.self_and_ancestors.include?(taxon)) ? 'current' : nil
          content_tag :li, class: css_class do
            content_tag :div, class: 'content-collection-container' do
              content_tag( :h3, taxon.name, class: 'collection-title') +
              content_tag( :p, taxon.description, class: 'collection-description') +
              link_to('Découvrir', seo_url(taxon), class: 'button discover-button-collection ') +
              taxons_tree(taxon, current_taxon, max_level - 1)
            end
          end
        end
        safe_join(taxons, "\n")
      end
    end

    def available_countries(restrict_to_zone: Spree::Config[:checkout_zone])
      countries = Spree::Country.available(restrict_to_zone: restrict_to_zone)

      country_names = Carmen::Country.all.map do |country|
        [country.code, country.name]
      end.to_h

      country_names.update I18n.t('spree.country_names', default: {}).stringify_keys

      countries.collect do |country|
        country.name = country_names.fetch(country.iso, country.name)
        country
      end.sort_by { |country| country.name.parameterize }
    end

    def seo_url(taxon)
      spree.nested_taxons_path(taxon.permalink)
    end

    def display_price(product_or_variant)
      product_or_variant.price_for(current_pricing_options).to_html
    end

    def pretty_time(time, format = :long)
      I18n.l(time, format: :"solidus.#{format}")
    end

    def link_to_tracking(shipment, options = {})
      return unless shipment.tracking && shipment.shipping_method

      if shipment.tracking_url
        link_to(shipment.tracking, shipment.tracking_url, options)
      else
        content_tag(:span, shipment.tracking)
      end
    end

    def plural_resource_name(resource_class)
      resource_class.model_name.human(count: Spree::I18N_GENERIC_PLURAL)
    end

    def clickAndCollectAddress
      {
        name: "Maison des Étudiants",
        company: "CultureCampus",
        address1: "19 Esplanade des Antilles",
        address2: "",
        city: "Pessac",
        country_id: Spree::Country.find_by(name: "France").id,
        state_id: Spree::State.find_by(name: "Nouvelle-Aquitaine").id,
        state_name: "Nouvelle-Aquitaine",
        zipcode: "33600",
        phone: "06 00 00 00 00",
        alternative_phone: ""
      }
    end

    def isClickAndCollectAddress(address)
      address.name == clickAndCollectAddress[:name] &&
      address.company == clickAndCollectAddress[:company] &&
      address.address1 == clickAndCollectAddress[:address1] &&
      address.address2 == clickAndCollectAddress[:address2] &&
      address.city == clickAndCollectAddress[:city] &&
      address.country_id == clickAndCollectAddress[:country_id] &&
      address.state_id == clickAndCollectAddress[:state_id] && 
      address.zipcode == clickAndCollectAddress[:zipcode] &&
      address.phone == clickAndCollectAddress[:phone] &&
      address.alternative_phone == clickAndCollectAddress[:alternative_phone] 
    end
  end
end
