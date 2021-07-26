$(document).ready(function () {
  var env = "http://localhost/PHP-TEST/REST%20-API/";
  function table(data) { 
    let html='';
    var avtar;
    for(let i=data.length-1;i>=0;i--){
      if(i%2==0){
        avtar = 'avatar-pink';
      }else if(i%2==1){
        avtar = 'avatar-blue';
      }
      html += '<tr> <td>'+data[i].id+'</td> <td> <a href="#"> <div class="d-flex align-items-center"> <div class="avatar '+avtar+' mr-3">'+data[i].name[0]+'</div> <div class=""> <p class="font-weight-bold mb-0">'+data[i].name+'</p> <p class="text-muted mb-0">'+data[i].name.toLowerCase().replace(' ','')+'@example.com</p> </div> </div> </a> </td> <td>'+data[i].age+'</td> <td>'+data[i].gender+'</td> <td>'+data[i].state+'</td> <td>'+data[i].city+'</td> <td> <div class="dropdown"> <button class="btn btn-sm btn-icon" type="button" id="dropdownMenuButton'+i+'" data-toggle="dropdown" > <i class="bx bx-dots-horizontal-rounded" data-toggle="tooltip" data-placement="top" title="Actions"></i> </button> <div class="dropdown-menu" aria-labelledby="dropdownMenuButton'+i+'"> <a class="dropdown-item edit" href="#" data-edit="'+data[i].id+'"><i class="bx bxs-pencil mr-2"></i> Edit Profile</a> <a class="dropdown-item text-danger delete"  data-del="'+data[i].id+'" href="#"><i class="bx bxs-trash mr-2"></i>Remove</a> </div> </div> </td> </tr>';
    }
    return html;
  }
  function loadData() {
    $.ajax({
      url: env+"api-fetch-all.php",
      method: "POST",
      contentType: "JSON",
      success: function (data) {
        let html = table(data);
        $('#load').html(html);
      }
    });
  }
  loadData();

  function Notify(data) {
    let message;
    if(data.status=true){
       message = '<div class="alert alert-success alert-dismissible" style="position: fixed;bottom:5%;left:2%;z-index:999;" role="alert"><strong>'+data.message+'</strong> <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div>';
    }else{
      message = '<div class="alert alert-danger alert-dismissible" style="position: fixed;bottom:5%;left:2%;z-index:999;" role="alert"><strong>'+data.message+'</strong> <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div>';
    }
    let success = $(message).fadeIn(800).delay( 2000 ).fadeOut( 600 );
    $("body").append(success);
  }
  $('#myForm').on('submit',(e)=>{
    e.preventDefault();
    let id = e.target.id.value;
    let name = e.target.name.value;
    let age = e.target.age.value;
    let gender = e.target.gender.value;
    let state = e.target.state.value;
    let city = e.target.city.value;
    let obj;
    let url;
    if(id==""){
      obj = { name:name,age:age,gender:gender,state:state,city:city }
      url = env+"api-insert.php";
    }else{
      obj = {sid:id,name:name,age:age,gender:gender,state:state,city:city }
      url = env+"api-update.php";
    }
    if(name && age && gender && state && city !=""){
      $.ajax({
        url: url,
        method: "POST",
        contentType: "JSON",
        data: JSON.stringify(obj),
        success: function (data) {
          $('#myForm').trigger('reset');
          e.target.id.value="";
          loadData();
          Notify(data);
        }
      });
    }else{
      alert('Fill All the Fields');
    }
  });

  $(document).on('click','.delete',(e)=>{
    e.preventDefault();
    let id = $(e.target).data('del');
    if(confirm("Are You Sure Want to Delete this Data")){
      $.ajax({
        url: env+"api-delete.php",
        method: "POST",
        contentType: "JSON",
        data: JSON.stringify({'sid':id}),
        success: function (data) {
          loadData();
          Notify(data);
        }
      });
    }else{
      return false;
    }
  });
  $(document).on('click','.edit',(e)=>{
    e.preventDefault();
    let id = $(e.target).data('edit');
      $.ajax({
        url: env+"api-fetch-single.php",
        method: "POST",
        contentType: "JSON",
        data: JSON.stringify({'sid':id}),
        success: function (data) {
          $("#myForm")[0][0].value = data.id;
          $("#myForm")[0][1].value = data.name;
          $("#myForm")[0][2].value = data.age;
          if(data.gender=="Male"){
            $("#inlineRadio1").prop("checked",true);
          }else{
            $("#inlineRadio2").prop("checked",true);
          }
          $('#inputState').find('option[value="' + data.state + '"]').prop('selected',true);
          $("#inputState").change();
          $('#inputDistrict').find('option[value="' + data.city + '"]').prop('selected',true);
            
        }
      });
  });
});
