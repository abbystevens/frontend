(function() {
  'use strict';
  angular.module('frontendApp').controller('CampaignCtrl', function($scope, $routeParams, CampaignService, $http) {


    $scope.campaignId = $routeParams.campaignId;

    var startDate = new Date(2010, 1, 1).getTime();
    var endDate = new Date(2014, 9, 1).getTime();

    $scope.defaults = {
      photo: "images/icons/genderless.svg"
    }
    $scope.photo = $scope.defaults.photo;

    $scope.viewModel = {
      campaign: {},
      financialSummary: null,
      moneyByState: null
    };

    CampaignService.getCampaign($routeParams.campaignId).then(function(result) {
      $scope.viewModel.campaign = result;
      $scope.photo = ($scope.viewModel.campaign.photo || $scope.defaults.photo);

      CampaignService.getCampaignFinancialSummary($scope.viewModel.campaign.filer_id).then(function(result) {
        $scope.viewModel.financialSummary = result;
      });

      CampaignService.getCampaignMoneyByState($scope.viewModel.campaign.filer_id).then(function(result) {
        $scope.viewModel.moneyByState = result;
      });
    });

  });

}).call(this);
