require "test_helper"

class Spree::PointsDeVenteControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get spree_points_de_vente_index_url
    assert_response :success
  end
end
