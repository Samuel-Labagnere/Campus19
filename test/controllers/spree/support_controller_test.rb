require "test_helper"

class Spree::SupportControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get spree_support_index_url
    assert_response :success
  end
end
