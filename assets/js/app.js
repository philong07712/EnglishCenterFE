function checkLogin() {
    var tk = document.getElementById("signin-email").value;
    var mk = document.getElementById("signin-password").value;

    if (tk=="" || mk=="") {
        alert('Chưa nhập Username hoặc Password')
    }

    var url = `https://amesbe.herokuapp.com/api/general/login/${tk}/${mk}`
    console.log(url)
    fetch(url,{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
            // 'Authorization': sessionStorage.getItem("Token")
        }
    }).then(function(reponse){
        if(reponse.status !=200){
            alert('Nhập sai Username hoặc Password')
        }
        else {
            return reponse.json()
        }
    })
    .then(function(json){xulyLogin(json)})
}

function xulyLogin(json){
     var tk1 = document.getElementById("signin-email").value;

    window.sessionStorage.setItem("Token",json.Token)
    console.log(typeof(tk1))
    let result = tk1.substring(0, 2);
    if(result == "GV"){
        window.location.replace("./thong_tin_ca_nhan.html")
    }
	 if(result == "QL"){
        window.location.replace("./index_quanly.html")
    }
	if(result == "ad"){
        window.location.replace("./index_admin.html")
    }
}


function lay_thong_tin_gv(){
    var url = `https://amesbe.herokuapp.com/api/general/info`
    console.log(url)
    fetch(url,{
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("Token")
        }
    }).then((reponse)=>{
           if(reponse.ok){
			   reponse.json().then((json)=>{
				console.log(json)
				 

				   hienthi_ttgv(json)
	
				
			
			   })
		   }
		   
		   
    }).catch((error)=>{
     console.log(object)
})
}




function hienthi_ttgv(json){
	document.getElementById("maso-gv").value = json.TK;
    document.getElementById("hoten-gv").value = json.HoTen;
    document.getElementById("cccd-gv").value = json.MaCanCuoc;
    document.getElementById("ngaysinh-gv").value = json.NgaySinh;
    if (json.GioiTinh == false) {
        document.getElementById("gioitinh-gv").value = "Nam";
    } else {
        document.getElementById("gioitinh-gv").value = "Nữ";
    }
    document.getElementById("dienthoai-gv").value = json.SDT;
    document.getElementById("diachi-gv").value = json.DiaChi;

    window.sessionStorage.setItem("MK",json.MK);
}

function doi_mat_khau_gv(){
    var old_pass_gv = document.getElementById("old_pass_gv").value;
    var new_pass_gv = document.getElementById("new_pass_gv").value;
    var re_new_pass_gv = document.getElementById("re_new_pass_gv").value;

    var url = `https://amesbe.herokuapp.com/api/general/info`

    if (old_pass_gv != sessionStorage.getItem("MK")){
        alert('Nhập sai mật khẩu hiện tại.')
    } else {
        if (new_pass_gv != re_new_pass_gv){
            alert('Nhập lại mật khẩu mới không đúng với mật khẩu mới.')
        } else {

        }
    }
    

    // var url = `https://amesbe.herokuapp.com/api/general/info`
    // console.log(url)
    // fetch(url,{
    //     method:"POST",
    //     headers:{
    //         'Content-Type': 'application/json',
    //         'Authorization': sessionStorage.getItem("Token")
    //     }
    // }).then(function(reponse){
    //         return reponse.json()
    // })
    // .then(function(json){dmk_gv(json)})
}

function dmk_gv(json){

}



