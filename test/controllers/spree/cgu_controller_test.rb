require "test_helper"

class Spree::CguControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get spree_cgu_index_url
    assert_response :success
  end
end
