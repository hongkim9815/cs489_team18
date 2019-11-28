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
        console.log(data);
        datalist = data.split("---");
        console.log(datalist);
        content = '';
        var i = 0;
        for(i = 0; i < datalist.length - 4; i++)
        {
          content += datalist[i];
        }
        document.getElementById('result').innerText = content;
        document.getElementById('good').innerText = datalist[i];
        document.getElementById('bad').innerText = datalist[i+1];
        document.getElementById('good_recent').innerText = datalist[i+2];
        document.getElementById('bad_recent').innerText = datalist[i+3];
      },
    });
  }

document.addEventListener('DOMContentLoaded', function(){
  var submit_button = document.getElementById('submit_button');
  submit_button.addEventListener('click', submit_data_func);
  chrome.tabs.getSelected(null, function(tab){
    chrome.tabs.executeScript(tab.id, {code: "window.getSelection().toString();"}, function (blocked){
      if(blocked[0].length > 0)
      {
        document.getElementById('name').value = blocked[0];
        submit_data_func();
      }
    });
  });
  document.body.addEventListener('dblclick', function(){
    console.log(window.getSelection().toString());
  });
  document.body.addEventListener('click', function(){
    console.log(window.getSelection().toString());
  });
});

$('input[type="text"]').keydown(function() {
  if (event.keyCode == 13){
    submit_data()
  }
});
