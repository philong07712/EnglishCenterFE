// Đăng nhập
function checkLogin() {
    var tk = document.getElementById("signin-email").value;
    var mk = document.getElementById("signin-password").value;

    if (tk=="" || mk=="") {
        alert('Chưa nhập Username hoặc Password')
    }

    var url = `https://amesbe.herokuapp.com/api/general/login/${tk}/${mk}`
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
    let result = tk1.substring(0, 2);
    if(result == "HV"){
        window.location.replace("./thong_tin_hoc_vien.html")
    }
    if(result == "GV"){
        window.location.replace("./gv_thong_tin_ca_nhan.html")
    }
    if(result == "QL"){
        console.log(typeof(tk1))
        window.location.replace("./index_quanly.html")
    }
	if(result == "ad"){
        window.location.replace("./index_admin.html")
    }
}


// Hiển thị thông tin học viên
function lay_thong_tin_hv(){
    var url = `https://amesbe.herokuapp.com/api/general/info`
    fetch(url,{
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("Token")
        }
    }).then(function(reponse){
        if(reponse.status !=200){
            alert('Xảy ra lỗi!')
        }
        else {
            return reponse.json()
        }
    })
    .then(function(json){hienthi_tthv(json)})
}

function hienthi_tthv(json){
    var hoten = json.HoTen;
    console.log(hoten)
    if(hoten!=null){
    var dem=0;
    for (var i=hoten.length-1; i>=0; i--){
        if (hoten.substring(i,i+1) == " "){
            dem=i;
            break;
        }
    }
    sessionStorage.setItem("HoTen",hoten.substring(dem+1,hoten.length))
    } else sessionStorage.setItem("HoTen",json.TK)
    document.getElementById("user-dropdown-toggle").innerHTML = sessionStorage.getItem("HoTen")

    var ngaysinh =  new Date(json.NgaySinh);
    document.getElementById("maso-hv").value = json.TK;
    document.getElementById("hoten-hv").value = json.HoTen;
    document.getElementById("cccd-hv").value = json.MaCanCuoc;
    document.getElementById("ngaysinh-hv").value = ngaysinh.toLocaleDateString();
    if (json.GioiTinh == false) {
        document.getElementById("gioitinh-hv").value = "Nữ";
    } else {
        document.getElementById("gioitinh-hv").value = "Nam";
    }
    document.getElementById("dienthoai-hv").value = json.SDT;
    document.getElementById("diachi-hv").value = json.DiaChi;

    window.sessionStorage.setItem("MK",json.MK);
    window.sessionStorage.setItem("TK",json.TK);
}


// đổi mật khẩu
function hv_load_dmk(){
    document.getElementById("user-dropdown-toggle").innerHTML = sessionStorage.getItem("HoTen")
}

function hv_doi_mat_khau(){
    var old_pass_hv = document.getElementById("old_pass_hv").value;
    var new_pass_hv = document.getElementById("new_pass_hv").value;
    var re_new_pass_hv = document.getElementById("re_new_pass_hv").value;
	
	console.log(sessionStorage.getItem("MK"))

    if (old_pass_hv != sessionStorage.getItem("MK")){
        alert('Nhập sai mật khẩu hiện tại!'); 
    } 
    else {
        if (new_pass_hv != re_new_pass_hv){
            alert('Nhập lại mật khẩu mới không giống nhau!');
        } 
        else {
            if (old_pass_hv == new_pass_hv){
                alert('Mật khẩu mới phải khác mật khẩu cũ!');
            }
            else{
                var url = `https://amesbe.herokuapp.com/api/general/change/${new_pass_hv}`;
                fetch(url,{
                    method:"POST",
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': sessionStorage.getItem("Token")
                    }
                }).then(function(response) { 
                    if (response.status != 200){
                        alert('Xảy ra lỗi!')
                    } else {
                        return response.json
                    }
                }).then(function(json){
                    window.sessionStorage.setItem("MK",new_pass_hv);
				    alert("Cập nhật thành công")
                })
            }
        }
    }
			
}

// Chỉnh sửa thông tin cá nhân học viên
function hv_chinh_sua_ttcn(){
    document.getElementById("user-dropdown-toggle").innerHTML = sessionStorage.getItem("HoTen")
    var url = `https://amesbe.herokuapp.com/api/general/info`
    fetch(url,{
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("Token")
        }
    }).then(function(reponse){
        if(reponse.status !=200){
            alert('Xảy ra lỗi!')
        }
        else {
            return reponse.json()
        }
    })
    .then(function(json){hv_chinhsua(json)})
} 

function hv_chinhsua(json){
    document.getElementById("maso-hv").value = json.TK;
    document.getElementById("hoten-hv").value = json.HoTen;
    document.getElementById("cccd-hv").value = json.MaCanCuoc;

    var ngaysinh =  new Date(json.NgaySinh);
	date = new Date(ngaysinh);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    document.getElementById("ngaysinh-hv").value = year+'-' + month + '-'+dt;
     if (json.GioiTinh == false) {
        document.getElementById("nu").checked = true;
     } else {
        document.getElementById("nam").checked = true;
    }
    document.getElementById("dienthoai-hv").value = json.SDT;
    document.getElementById("diachi-hv").value = json.DiaChi;

    window.sessionStorage.setItem("MK",json.MK);
}

function hv_capnhat_ttcn(){
    var date = new Date(document.getElementById("ngaysinh-hv").value);
    console.log(date);

    var date1 = new Date(date);
    console.log(date1);
    
    var gioitinh;
    if(document.getElementById('nam').checked){
        gioitinh=true
    }
    if (document.getElementById('nu').checked){
        gioitinh=false
    }

    if (document.getElementById("cccd-hv").value == "" || document.getElementById("ngaysinh-hv").value == "" ||
        document.getElementById("dienthoai-hv").value == "" || document.getElementById("diachi-hv").value == ""){
            alert('Chưa nhập đủ thông tin!')
        } else{
            data = {
                "GioiTinh": gioitinh,
                "SDT": document.getElementById("dienthoai-hv").value,
                "NgaySinh": date,
                "DiaChi": document.getElementById("diachi-hv").value,
                "TK": sessionStorage.getItem("TK"),
                "isActive": true,
                "HoTen": document.getElementById("hoten-hv").value,
                "MK": sessionStorage.getItem("MK"),
                "MaCanCuoc": document.getElementById("cccd-hv").value
            }
            // console.log(JSON.stringify(data))
            // var mydate = new Date(2014-04-03);
            // console.log(mydate.toDateString());
            // console.log(mydate)
            var url = `https://amesbe.herokuapp.com/api/general/info`
            fetch(url,{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("Token")
                }
            }).then(function(response) { 
                if (response.status != 200){
                    alert('Xảy ra lỗi!')
                } else {
                    return response.json
                }
            }).then(function(json){
            
            })
            
        }
        alert("Cập nhật thành công")
}


// Xem danh sách lớp
function hv_xem_ds_lop(){
    document.getElementById("user-dropdown-toggle").innerHTML = sessionStorage.getItem("HoTen")
    var url = `https://amesbe.herokuapp.com/api/class/list/${sessionStorage.getItem("TK")}`
    fetch(url,{
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("Token")
        }
    }).then(function(reponse){
        if(reponse.status != 200) {
            alert('Xảy ra lỗi!')
        }
        else {
            return reponse.json()
        }
    })
    .then(function(json){ hienthi_dsl(json)})
}

function hienthi_dsl(json){
    let maLop = []
    for (var i=0;i<json.length;i++) {
        maLop[i]=json[i].MaLop;
    }
    
    var table = document.getElementById("showData")
    for (var i=0; i<json.length; i++){
        var soluong = json[i].HocVien.length;
        var row =   `<tr>
                        <td>${i+1}</td>
                        <td>${json[i].MaLop}</td>
                        <td>${json[i].TenLop}</td>
                        <td>${json[i].GioHoc}</td>
                        <td>${json[i].PhongHoc}</td>
                        <td>${soluong}</td>
                        <td class="cell"><button class="btn-sm app-btn-secondary" onclick="hv_xemct_lop('${maLop[i]}')">View</button></td>
                    </tr>`
        table.innerHTML +=row

     }
}


// xem chi tiết lớp
function hv_xemct_lop(malop){
    window.sessionStorage.setItem("MaLop",malop);
    window.location.replace("./view_lop.html")
}

function hv_xem_chi_tiet_lop(){
    document.getElementById("user-dropdown-toggle").innerHTML = sessionStorage.getItem("HoTen")
    var url = `https://amesbe.herokuapp.com/api/class/${sessionStorage.getItem("MaLop")}`
    fetch(url,{
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("Token")
        }
    }).then(function(reponse){
        if(reponse.status !=200){
            alert('Xảy ra lỗi!')
        }
        else {
            return reponse.json()
        }
    })
    .then(function(json){hv_hienthi_ct_lop(json)})
}

function hv_hienthi_ct_lop(json){
    document.getElementById("malop").innerHTML = json.LopHoc.MaLop;
    document.getElementById("tenlop").innerHTML = json.LopHoc.TenLop;
    document.getElementById("soluong").innerHTML = json.HocVien.length;
    document.getElementById("thoigian").innerHTML = json.LopHoc.GioHoc;
    document.getElementById("phong").innerHTML = json.LopHoc.PhongHoc;
    

    let maHv = []
    for (var i=0;i<json.HocVien.length;i++) {
        maHv[i]=json.HocVien[i].MaHocVien;
    }

    var table = document.getElementById("danhsach_lop")
    for (var i=0; i<json.HocVien.length; i++){ 
        var row =   `<tr>
                        <td>${i+1}</td>
                        <td>${json.HocVien[i].TK}</td>
                        <td>${json.HocVien[i].HoTen}</td>
                        <td>${json.HocVien[i].DiaChi}</td>
                        <td>${json.HocVien[i].SDT}</td>
                    </tr>`
        
        table.innerHTML +=row
    }
}

// Xem kết quả học tập
function hv_xem_kqht(){
    document.getElementById("user-dropdown-toggle").innerHTML = sessionStorage.getItem("HoTen")
    var url = `https://amesbe.herokuapp.com/api/score/list/${sessionStorage.getItem("TK")}`
    fetch(url,{
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("Token")
        }
    }).then(function(reponse){
        if(reponse.status != 200){
            alert('Xảy ra lỗi!')
        }
        else {
            return reponse.json()
        }
    })
    .then(function(json){ hienthi_kqht(json)})
}

function hienthi_kqht(json){
    let maLop = []
    for (var i=0;i<json.length;i++) {
        maLop[i]=json[i].MaLop;
    }
    
    var table = document.getElementById("show")
    for (var i=0; i<json.length; i++){
        var diemnghe = json[i].DiemNghe;
        diemnghe = parseFloat(diemnghe);
        var diemnoi = json[i].DiemNoi;
        diemnoi = parseFloat(diemnoi);
        var diemdoc = json[i].DiemDoc;
        diemdoc = parseFloat(diemdoc);
        var diemviet = json[i].DiemViet;
        diemviet = parseFloat(diemviet);
        var diem = (diemnghe+diemnoi+diemdoc+diemviet)/4;
        var row =   `<tr>
                        <td>${i+1}</td>
                        <td>${json[i].MaLop}</td>
                        <td>${json[i].TenLop}</td>
                        <td>${diem}</td>
                        <td class="cell"><button class="btn-sm app-btn-secondary" onclick="hv_xemct_kqht('${maLop[i]}')">View</button></td>
                    </tr>`
        table.innerHTML +=row

     }
}

// xem chi tiết kết quả học tậP
function hv_xemct_kqht(malop){
    window.sessionStorage.setItem("MaLop",malop);
    window.location.replace("./view_ket_qua.html")
}

function hv_xem_chi_tiet_kqht(){
    document.getElementById("user-dropdown-toggle").innerHTML = sessionStorage.getItem("HoTen")
    var url = `https://amesbe.herokuapp.com/api/score/${sessionStorage.getItem("TK")}/${sessionStorage.getItem("MaLop")}`
    fetch(url,{
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("Token")
        }
    }).then(function(reponse){
        if(reponse.status != 200){
            alert('Xảy ra lỗi!')
        }
        else {
            return reponse.json()
        }
    })
    .then(function(json){hv_hienthict_kqht(json)})
}

function hv_hienthict_kqht(json){
    document.getElementById("malop").innerHTML = json.MaLop;
    document.getElementById("tenlop").innerHTML = json.TenLop;


    var table = document.getElementById("Diem")
     
        var row =   `<tr>
                        <td>${json.DiemNghe}</td>
                        <td>${json.DiemNoi}</td>
                        <td>${json.DiemDoc}</td>
                        <td>${json.DiemViet}</td>
                    </tr>`
        
        table.innerHTML +=row
    
}