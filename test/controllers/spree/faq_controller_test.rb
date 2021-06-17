require "test_helper"

class Spree::FaqControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get spree_faq_index_url
    assert_response :success
  end
end
