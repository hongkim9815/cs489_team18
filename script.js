function submit_data_func(){
  var formData = new FormData();
  formData.append("name", $('#name').val());
  $.ajax({
    url: "http://110.76.78.39:46857/cs489_ce/search.php",
    type: 'POST',
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function(data){
      datalist = data.split("---");
      document.getElementById('result').innerText = data;
      if(datalist.length < 5)
      {
        if (datalist[0] == "NO VOCA")
        {
          document.getElementById('word').innerText = ""; //$('#name').val();
          document.getElementById('good').innerHTML = "";
          document.getElementById('bad').innerHTML = "";
          document.getElementById('result').innerHTML =
          'There is no "'+datalist[1]+'"<br><br>'
          + 'Please, add a meaning of the word...'
          + '<br>'
          + '<textarea class="text" id="mean" style="width:100%; height:100%"></textarea>'
          + '<br>'
          + '<center><input type="submit" id="submit" value="Send Request"></center>';
          document.getElementById('gb').innerText = "";

          $('#submit').click(function(event){
            var submitData = new FormData();
            submitData.append("name", $('#name').val());
            submitData.append("mean", $('#mean').val());
            $.ajax({
              url: "http://110.76.78.39:46857/cs489_ce/submit.php",
              type: 'POST',
              data: submitData,
              cache: false,
              contentType: false,
              processData: false,
              success: function(data){
                alert("Submitted!");
                submit_data_func();
              }
            });
            submit_data_func();
          });
        }
        else
          document.getElementById('result').innerText = "ERROR : " + data;
      }
      else
      {
        content = '';
        var i = 0;
        for(i = 2; i < datalist.length - 2; i++)
        {
          content += datalist[i];
        }
        document.getElementById('word').innerText = datalist[1] + " : "; // $('#name').val();
        document.getElementById('result').innerText = content;
        document.getElementById('good').innerHTML =
          '<img id="goodimg" src="good.png" width="24" height="24"> : '
          + datalist[i];
        document.getElementById('bad').innerHTML =
          '<img id="badimg" src="bad.png" width="24" height="24"> : '
          + datalist[i+1];
        document.getElementById('gb').innerText = " / ";

        $('#goodimg').click(function() {
          var nullform = new FormData();
          $.ajax({
            url: "http://110.76.78.39:46857/cs489_ce/jobs.php?do=1&id=" + datalist[0],
            type: 'POST',
            data: nullform,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data){
              alert("Submitted!");
              submit_data_func();
            }
          });
        });

        $('#badimg').click(function() {
          var nullform = new FormData();
          $.ajax({
            url: "http://110.76.78.39:46857/cs489_ce/jobs.php?do=2&id=" + datalist[0],
            type: 'POST',
            data: nullform,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data){
              alert("Submitted!");
              submit_data_func();
            }
          });
        });
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function(){
  chrome.tabs.getSelected(null, function(tab){
    chrome.tabs.executeScript(tab.id, {code: "window.getSelection().toString();"}, function (blocked){
      if(blocked[0].length > 0)
      {
        document.getElementById('name').value = blocked[0];
        submit_data_func();
      }
    });
  });
});

$(document).ready(function() {
  $('#name').keydown(function(event){
    submit_data_func();
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});
