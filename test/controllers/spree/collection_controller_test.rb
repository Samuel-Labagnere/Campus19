require "test_helper"

class Spree::CollectionControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get spree_collection_index_url
    assert_response :success
  end
end
