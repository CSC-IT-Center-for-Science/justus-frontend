'use strict';

angular.module('AuthService', [])
.service('AuthService', [
  function() {
    this.storeUserInfo = (user) => {
      localStorage.setItem('justusUser', JSON.stringify(user));
    };

    this.getUserInfo = () => {
      return JSON.parse(localStorage.getItem('justusUser'));
    };
  }
]);
