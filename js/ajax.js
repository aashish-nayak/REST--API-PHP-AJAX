$(document).ready(function () {
  function table(data) { 
    var html='';
    for(var i=data.length-1;i>=0;i--){
      html += '<tr> <td>'+data[i].id+'</td> <td> <a href="#"> <div class="d-flex align-items-center"> <div class="avatar avatar-pink mr-3">'+data[i].name[0]+'</div> <div class=""> <p class="font-weight-bold mb-0">'+data[i].name+'</p> <p class="text-muted mb-0">'+data[i].name.toLowerCase().replace(' ','')+'@example.com</p> </div> </div> </a> </td> <td>'+data[i].age+'</td> <td>'+data[i].gender+'</td> <td>'+data[i].city+'</td> <td> <div class="dropdown"> <button class="btn btn-sm btn-icon" type="button" id="dropdownMenuButton'+i+'" data-toggle="dropdown" > <i class="bx bx-dots-horizontal-rounded" data-toggle="tooltip" data-placement="top" title="Actions"></i> </button> <div class="dropdown-menu" aria-labelledby="dropdownMenuButton'+i+'"> <a class="dropdown-item edit" href="#" data-edit="'+data[i].id+'"><i class="bx bxs-pencil mr-2"></i> Edit Profile</a> <a class="dropdown-item text-danger delete"  data-del="'+data[i].id+'" href="#"><i class="bx bxs-trash mr-2"></i>Remove</a> </div> </div> </td> </tr>';
    }
    return html;
  }
  function loadData() {
    $.ajax({
      url: "http://localhost/PHP-TEST/REST%20-API/api-fetch-all.php",
      method: "POST",
      contentType: "JSON",
      success: function (data) {
        var html = table(data);
        $('#load').html(html);
      }
    });
  }
  loadData();

  $('#myForm').on('submit',(e)=>{
    e.preventDefault();
    var name = e.target.name.value;
    var age = e.target.age.value;
    var gender = e.target.gender.value;
    var city = e.target.city.value;
    var obj = { name:name,age:age,gender:gender,city:city };
    if(name && age && gender && city !=""){
      $.ajax({
        url: "http://localhost/PHP-TEST/REST%20-API/api-insert.php",
        method: "POST",
        contentType: "JSON",
        data: JSON.stringify(obj),
        success: function (data) {
          $('#myForm').trigger('reset');
          var success = '<div class="alert alert-success alert-dismissible" style="position: fixed;top:5%;right:2%;z-index:999;" role="alert"> <strong>Holy guacamole!</strong> You should check in on some of those fields below. <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div>';
          loadData();
          success = $(success).fadeIn(800).delay( 2000 ).fadeOut( 600 );
          $("body").append(success);
        }
      });
    }else{
      alert('Fill All the Fields');
    }
  });

});
