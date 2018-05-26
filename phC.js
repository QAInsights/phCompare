$(document).ready(function() {
  //disable compare button
  $('#friendsMakeDiv').append("");
  $('#btnCompare').attr('disabled', true);
  $('#btnClear').attr('disabled', true);
  $('table').hide(); // Hide table
  $('.checkInput').keyup(function() {
    if ($("#yours").val().length != 0 && $("#friends").val().length != 0 && $("#yours").val() > 0 && $("#friends").val() > 0) {
      $('#btnCompare').attr('disabled', false);
      $('#btnClear').attr('disabled', false);
    } else {
      $('#btnCompare').attr('disabled', true);
      $('#btnClear').attr('disabled', true);

    }
  })
  //clear button
  $("#btnClear").click(function() {
    document.getElementById("yours").value = "";
    document.getElementById("friends").value = "";
    $('#btnCompare').attr('disabled', true);
    $('#btnClear').attr('disabled', true);
    $('table').hide(); // Hide table

  });
  $("#divLoading").hide();
  $("#btnCompare").click(function() {
    $("#divLoading").show();
    //get auth code
    $.post('https://api.producthunt.com/v1/oauth/token', {
      "client_id": "b98848f0a1d4373e49107c06349aa6ed12ad4dbafa192b2780ca19fa34f56155",
      "client_secret": "664ff35f9d806a6b0f72a6d1d53a613dd7366ba6f55873387171c19437efb172",
      "grant_type": "client_credentials"
    }, function(data) {
      //get details
      $.ajax({
        url: "https://api.producthunt.com/v1/users/" + document.getElementById("yours").value,
        type: "GET",
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + data.access_token)
        },
        success: function(result) {
          //find the deleted user
          var yourUsername;
          yourUsername = result.user.username;
          if (yourUsername.toLowerCase() === "deleted_user") {
            document.getElementById("yourName").innerHTML = "Bummer! User not found";
            document.getElementById("yourUsername").innerHTML = "";
            document.getElementById("yourHeadLine").innerHTML = "";
            document.getElementById("yourWebsite").innerHTML = "";
            document.getElementById("yourTwitter").innerHTML = "";
            document.getElementById("yourFollowers").innerHTML = "";
            document.getElementById("yourFollowing").innerHTML = "";
            document.getElementById("yourPHLink").innerHTML = "";
            document.getElementById("yourMakes").innerHTML = "";
            $("#yourImage").attr("src", "https://www.freeiconspng.com/uploads/person-icon-person-icon-17.jpg");
            $("#divLoading").hide();
          } else {
            document.getElementById("yourName").innerHTML = result.user.name;
            document.getElementById("yourUsername").innerHTML = result.user.username;
            document.getElementById("yourHeadLine").innerHTML = result.user.headline;
            document.getElementById("yourWebsite").innerHTML = result.user.website_url;
            $("#yourWebsite").attr("href", result.user.website_url);
            document.getElementById("yourTwitter").innerHTML = result.user.twitter_username;
            $("#yourTwitter").attr("href", "https://twitter.com/" + result.user.twitter_username);
            document.getElementById("yourFollowers").innerHTML = result.user.followers_count;
            document.getElementById("yourFollowing").innerHTML = result.user.followings_count;
            document.getElementById("yourPHLink").innerHTML = "PH Profile";
            $("#yourPHLink").attr("href", result.user.profile_url);
            $("#yourImage").attr("src", result.user.image_url.original);
            document.getElementById("yourMakes").innerHTML = result.user.maker_of_count;
            $('table').show(); // Show table
          }
        },
        error: function(xhr, textStatus, errorThrown) {
          document.getElementById("yourName").innerHTML = "Bummer! User not found";
          document.getElementById("yourUsername").innerHTML = "";
          document.getElementById("yourHeadLine").innerHTML = "";
          document.getElementById("yourWebsite").innerHTML = "";
          document.getElementById("yourTwitter").innerHTML = "";
          document.getElementById("yourFollowers").innerHTML = "";
          document.getElementById("yourFollowing").innerHTML = "";
          document.getElementById("yourPHLink").innerHTML = "";
          document.getElementById("yourMakes").innerHTML = "";
          $("#yourImage").attr("src", "https://www.freeiconspng.com/uploads/person-icon-person-icon-17.jpg");
          $("#divLoading").hide();
        }
      }, 'json');
    });

  });

  //Friends
  $("#btnCompare").click(function() {
    //get auth code
    $.post('https://api.producthunt.com/v1/oauth/token', {
      "client_id": "b98848f0a1d4373e49107c06349aa6ed12ad4dbafa192b2780ca19fa34f56155",
      "client_secret": "664ff35f9d806a6b0f72a6d1d53a613dd7366ba6f55873387171c19437efb172",
      "grant_type": "client_credentials"
    }, function(friendsdata) {
      //get details
      $.ajax({
        url: "https://api.producthunt.com/v1/users/" + document.getElementById("friends").value,
        type: "GET",
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + friendsdata.access_token)
        },
        success: function(friendsresult) {
          //find the deleted user
          var friendsUsername;
          friendsUsername = friendsresult.user.username;
          if (friendsUsername.toLowerCase() === "deleted_user") {
            document.getElementById("friendsName").innerHTML = "Bummer! User not found";
            document.getElementById("friendsUsername").innerHTML = "";
            document.getElementById("friendsHeadLine").innerHTML = "";
            document.getElementById("friendsWebsite").innerHTML = "";
            document.getElementById("friendsTwitter").innerHTML = "";
            document.getElementById("friendsFollowers").innerHTML = "";
            document.getElementById("friendsFollowing").innerHTML = "";
            document.getElementById("friendsPHLink").innerHTML = "";
            $("#friendsImage").attr("src", "https://www.freeiconspng.com/uploads/person-icon-person-icon-17.jpg");
            document.getElementById("friendsMakes").innerHTML = "";
            $("#divLoading").hide();
          } else {
            document.getElementById("friendsName").innerHTML = friendsresult.user.name;
            document.getElementById("friendsUsername").innerHTML = friendsresult.user.username;
            document.getElementById("friendsHeadLine").innerHTML = friendsresult.user.headline;
            document.getElementById("friendsWebsite").innerHTML = friendsresult.user.website_url;
            $("#friendsWebsite").attr("href", friendsresult.user.website_url);
            document.getElementById("friendsTwitter").innerHTML = friendsresult.user.twitter_username;
            $("#friendsTwitter").attr("href", "https://twitter.com/" + friendsresult.user.twitter_username);
            document.getElementById("friendsFollowers").innerHTML = friendsresult.user.followers_count;
            document.getElementById("friendsFollowing").innerHTML = friendsresult.user.followings_count;
            document.getElementById("friendsPHLink").innerHTML = "PH Profile";
            $("#friendsPHLink").attr("href", friendsresult.user.profile_url);
            $("#friendsImage").attr("src", friendsresult.user.image_url.original);
            document.getElementById("friendsMakes").innerHTML = friendsresult.user.maker_of_count;
            $("#divLoading").hide();
            $('table').show(); // Show table
          }
        },
        error: function(xhr, textStatus, errorThrown) {
          document.getElementById("friendsName").innerHTML = "Bummer! User not found";
          document.getElementById("friendsUsername").innerHTML = "";
          document.getElementById("friendsHeadLine").innerHTML = "";
          document.getElementById("friendsWebsite").innerHTML = "";
          document.getElementById("friendsTwitter").innerHTML = "";
          document.getElementById("friendsFollowers").innerHTML = "";
          document.getElementById("friendsFollowing").innerHTML = "";
          document.getElementById("friendsPHLink").innerHTML = "";
          $("#friendsImage").attr("src", "https://www.freeiconspng.com/uploads/person-icon-person-icon-17.jpg");
          document.getElementById("friendsMakes").innerHTML = "";
          $("#divLoading").hide();
        }
      });
    }, 'json');

    //Rule Manipulation
    //<!-- UP https://www.freeiconspng.com/uploads/green-arrow-png-7.png
    //DOWN https://www.freeiconspng.com/uploads/green-arrow-png-9.png
    //MAKE COUNT
    $(document).ajaxStop(function() {
      var intYourMake, intFriendsMake;
      var intYourFollowers, intFriendsFollowers;
      var intYourFollowingCount, intFriendsFollowingCount;

      intYourMake = document.getElementById("yourMakes").innerHTML;
      intFriendsMake = document.getElementById("friendsMakes").innerHTML;
      intYourFollowers = document.getElementById("yourFollowers").innerHTML;
      intFriendsFollowers = document.getElementById("friendsFollowers").innerHTML;
      intYourFollowingCount = document.getElementById("yourFollowing").innerHTML;
      intFriendsFollowingCount = document.getElementById("friendsFollowing").innerHTML;

      console.log(intYourFollowers + ' ' + intFriendsFollowers + ' ' + intYourFollowingCount + ' ' + intFriendsFollowingCount);
      //Make Compete
      if (parseInt(intYourMake) > parseInt(intFriendsMake)) {
        $('#yourMakeImage').attr("src", "https://www.freeiconspng.com/uploads/green-arrow-png-7.png");
        $('#friendsMakeImage').attr("src", "https://www.freeiconspng.com/uploads/green-arrow-png-9.png");

      } else {
        $('#friendsMakeImage').attr("src", "https://www.freeiconspng.com/uploads/green-arrow-png-7.png");
        $('#yourMakeImage').attr("src", "https://www.freeiconspng.com/uploads/green-arrow-png-9.png");
      }
      //Followers
      if (parseInt(intYourFollowers) > parseInt(intFriendsFollowers)) {
        $('#yourFollowersImage').attr("src", "https://www.freeiconspng.com/uploads/green-arrow-png-7.png");
        $('#friendsFollowersImage').attr("src", "https://www.freeiconspng.com/uploads/green-arrow-png-9.png");

      } else {

        $('#friendsFollowersImage').attr("src", "https://www.freeiconspng.com/uploads/green-arrow-png-7.png");
        $('#yourFollowersImage').attr("src", "https://www.freeiconspng.com/uploads/green-arrow-png-9.png");

      }
      //equal icon https://image.flaticon.com/icons/svg/14/14334.svg
      if (parseInt(intYourFollowers) == parseInt(intFriendsFollowers)) {
        $('#yourFollowersImage').attr("src", "https://image.flaticon.com/icons/svg/14/14334.svg");
        $('#friendsFollowersImage').attr("src", "https://image.flaticon.com/icons/svg/14/14334.svg");
      }
      if (parseInt(intYourMake) == parseInt(intFriendsMake)) {
        $('#yourMakeImage').attr("src", "https://image.flaticon.com/icons/svg/14/14334.svg");
        $('#friendsMakeImage').attr("src", "https://image.flaticon.com/icons/svg/14/14334.svg");

      }
    });
  });
  $("#divLoading").hide();
});
