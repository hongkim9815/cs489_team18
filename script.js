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
            document.getElementById('word').innerText = $('#name').val();
            document.getElementById('result').innerHTML =
            'There is no "'+datalist[1]+'"<br><br>'
            + 'Please, add a meaning of the word...'
            + '<br>'
            + '<textarea class="text" name="mean" style="width:100%; height:100%"></textarea>'
            + '<br>'
            + '<center><input type="submit" id="submit" value="Send Request"></center>';
            $('#submit').click(function(event){
              alert("Submitted!");
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
          for(i = 0; i < datalist.length - 4; i++)
          {
            content += datalist[i];
          }
          document.getElementById('word').innerText = $('#name').val();
          document.getElementById('result').innerText = content;
          document.getElementById('good').innerText = datalist[i];
          document.getElementById('bad').innerText = datalist[i+1];
          document.getElementById('good_recent').innerText = datalist[i+2];
          document.getElementById('bad_recent').innerText = datalist[i+3];
        }
      },
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
