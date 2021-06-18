require "test_helper"

class Spree::ContactControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get spree_contact_index_url
    assert_response :success
  end
end
