'use strict';

angular.module('stepPublicApp')
    .provider('DB', function () {

      this.host = 'http://saebybolig.discoball.pil.dk';

      this.$get = function($http) {

          var host = this.host;

          return {

              stat: {
                getData: function (info) {
                        return $http({
                            url: host + '/public/department/forbrug_data',
                            method: "POST",
                            data: info,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        });
                    },
                getInfo: function (department_id) {
                        return $http.get(host + '/public/department/area/' + department_id);
                    }
              }
          }
      };

      this.setHost = function(url) {
        this.host = url;
      };

    });