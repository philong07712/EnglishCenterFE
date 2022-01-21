// Hiển thị menu ở dạng màn hình nhỏ

/* ===== Responsive Sidepanel ====== */
const sidePanelToggler = document.getElementById('sidepanel-toggler'); 
const sidePanel = document.getElementById('app-sidepanel');  
const sidePanelDrop = document.getElementById('sidepanel-drop'); 
const sidePanelClose = document.getElementById('sidepanel-close'); 

window.addEventListener('load', function(){
	responsiveSidePanel(); 
});

window.addEventListener('resize', function(){
	responsiveSidePanel(); 
});


function responsiveSidePanel() {
    let w = window.innerWidth;
	if(w >= 1200) {
	    // if larger 
	    //console.log('larger');
		sidePanel.classList.remove('sidepanel-hidden');
		sidePanel.classList.add('sidepanel-visible');
		
	} else {
	    // if smaller
	    //console.log('smaller');
	    sidePanel.classList.remove('sidepanel-visible');
		sidePanel.classList.add('sidepanel-hidden');
	}
};

sidePanelToggler.addEventListener('click', () => {
	if (sidePanel.classList.contains('sidepanel-visible')) {
		console.log('visible');
		sidePanel.classList.remove('sidepanel-visible');
		sidePanel.classList.add('sidepanel-hidden');
		
	} else {
		console.log('hidden');
		sidePanel.classList.remove('sidepanel-hidden');
		sidePanel.classList.add('sidepanel-visible');
	}
});



sidePanelClose.addEventListener('click', (e) => {
	e.preventDefault();
	sidePanelToggler.click();
});

sidePanelDrop.addEventListener('click', (e) => {
	sidePanelToggler.click();
});



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

// Hiển thị thông tin giảng viên
function lay_thong_tin_gv(){
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
    .then(function(json){hienthi_ttgv(json)})
}

function hienthi_ttgv(json){
    var ngaysinh =  new Date(json.NgaySinh);
    document.getElementById("maso-gv").value = json.TK;
    document.getElementById("hoten-gv").value = json.HoTen;
    document.getElementById("cccd-gv").value = json.MaCanCuoc;
    document.getElementById("ngaysinh-gv").value = ngaysinh.toLocaleDateString();
    if (json.GioiTinh == false) {
        document.getElementById("gioitinh-gv").value = "Nữ";
    } else {
        document.getElementById("gioitinh-gv").value = "Nam";
    }
    document.getElementById("dienthoai-gv").value = json.SDT;
    document.getElementById("diachi-gv").value = json.DiaChi;

    window.sessionStorage.setItem("MK",json.MK);
    window.sessionStorage.setItem("TK",json.TK);
}

// đổi mật khẩu
function gv_doi_mat_khau(){
    var old_pass_gv = document.getElementById("old_pass_gv").value;
    var new_pass_gv = document.getElementById("new_pass_gv").value;
    var re_new_pass_gv = document.getElementById("re_new_pass_gv").value;

    if (old_pass_gv != sessionStorage.getItem("MK")){
        alert('Nhập sai mật khẩu hiện tại!'); 
    } 
    else {
        if (new_pass_gv != re_new_pass_gv){
            alert('Nhập lại mật khẩu mới không giống nhau!');
        } 
        else {
            var url = `https://amesbe.herokuapp.com/api/general/change/${new_pass_gv}`;
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
            })
            .then(function(json){
                window.sessionStorage.setItem("MK",new_pass_gv);
                window.location.replace("./gv_thong_tin_ca_nhan.html")
            })
        }
    }
}

// Chỉnh sửa thông tin cá nhân giảng viên
function gv_chinh_sua_ttcn(){
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
    .then(function(json){gv_chinhsua(json)})
} 

function gv_chinhsua(json){
    var ngaysinh =  new Date(json.NgaySinh);
    document.getElementById("maso-gv").value = json.TK;
    document.getElementById("hoten-gv").value = json.HoTen;
    document.getElementById("cccd-gv").value = json.MaCanCuoc;
    document.getElementById("ngaysinh-gv").value = ngaysinh.toLocaleDateString();
     if (json.GioiTinh == false) {
        document.getElementById("nu").checked = true;
     } else {
        document.getElementById("nam").checked = true;
    }
    document.getElementById("dienthoai-gv").value = json.SDT;
    document.getElementById("diachi-gv").value = json.DiaChi;

    window.sessionStorage.setItem("MK",json.MK);
}

function gv_capnhat_ttcn(){
    var date = new Date(document.getElementById("ngaysinh-gv").value);
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

    if (document.getElementById("cccd-gv").value == "" || document.getElementById("ngaysinh-gv").value == "" ||
        document.getElementById("dienthoai-gv").value == "" || document.getElementById("diachi-gv").value == ""){
            alert('Chưa nhập đủ thông tin!')
        } else{
            data = {
                "GioiTinh": gioitinh,
                "SDT": document.getElementById("dienthoai-gv").value,
                "NgaySinh": date,
                "DiaChi": document.getElementById("diachi-gv").value,
                "TK": sessionStorage.getItem("TK"),
                "isActive": true,
                "HoTen": document.getElementById("hoten-gv").value,
                "MK": sessionStorage.getItem("MK"),
                "MaCanCuoc": document.getElementById("cccd-gv").value
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
            window.location.replace("./gv_thong_tin_ca_nhan.html")
            })
            
        }
}

// Xem danh sách lớp
function gv_xem_ds_lop(){
    var url = `https://amesbe.herokuapp.com/api/class/list/teacherClass/${sessionStorage.getItem("TK")}`
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
    .then(function(json){gv_hienthi_dsl(json)})
}

function gv_hienthi_dsl(json){
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
                        <td class="cell"><button class="btn-sm app-btn-secondary" onclick="gv_xemct_lop('${maLop[i]}')">View</button></td>
                    </tr>`
        table.innerHTML +=row

     }
}

// xem chi tiết lớp
function gv_xemct_lop(malop){
    window.sessionStorage.setItem("MaLop",malop);
    window.location.replace("./gv_xem_chi_tiet_lop.html")
}

function gv_xem_chi_tiet_lop(){
    var url = `https://amesbe.herokuapp.com/api/teacher/class/${sessionStorage.getItem("MaLop")}`
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
    .then(function(json){gv_hienthi_ct_lop(json)})
}

function gv_hienthi_ct_lop(json){
    document.getElementById("malop").innerHTML = json.LopHoc.MaLop;
    document.getElementById("tenlop").innerHTML = json.LopHoc.TenLop;
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
                        <td>${json.HocVien[i].MaHocVien}</td>
                        <td>${json.HocVien[i].TenHocVien}</td>
                        <td class="cell"><button class="btn-sm app-btn-secondary" onclick="gv_gui_mhv('${maHv[i]}')">View</button></td>
                        <td>${json.HocVien[i].DiemNghe}</td>
                        <td>${json.HocVien[i].DiemNoi}</td>
                        <td>${json.HocVien[i].DiemDoc}</td>
                        <td>${json.HocVien[i].DiemViet}</td>
                    </tr>`
        
        table.innerHTML +=row
    }
}

// xem thông tin học viên
function gv_gui_mhv(mahv){
    window.sessionStorage.setItem("MaHV",mahv);
    window.location.replace("./gv_xem_chi_tiet_hv.html")
}

function gv_xem_ct_hv(){
    var url = `https://amesbe.herokuapp.com/api/teacher/info/${sessionStorage.getItem("MaHV")}`
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
    .then(function(json){gv_hienthi_ct_hv(json)})
}

function gv_hienthi_ct_hv(json){
    var ngaysinh = new Date(json.NgaySinh);
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
}

// nhập điểm
function gv_nhapdiem_json(){
    var url = `https://amesbe.herokuapp.com/api/teacher/class/${sessionStorage.getItem("MaLop")}`
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
    .then(function(json){gv_hienthi_nhapdiem(json)})
}

function gv_hienthi_nhapdiem(json){
    document.getElementById("malop").innerHTML = json.LopHoc.MaLop;
    document.getElementById("tenlop").innerHTML = json.LopHoc.TenLop;
    document.getElementById("thoigian").innerHTML = json.LopHoc.GioHoc;
    document.getElementById("phong").innerHTML = json.LopHoc.PhongHoc;

    var table = document.getElementById("table_nhapdiem")
    for (var i=0; i<json.HocVien.length; i++){
        var diemnghe =  'diemnghe'+i;
        var diemnoi =  'diemnoi'+i;
        var diemdoc =  'diemdoc'+i;
        var diemviet =  'diemviet'+i;
        var row =   `<tr>
                        <td>${i+1}</td>
                        <td>${json.HocVien[i].MaHocVien}</td>
                        <td>${json.HocVien[i].TenHocVien}</td>
                        <td class="cell"><input id="${diemnghe}" class="cell_input" type="text" ></td>
                        <td class="cell"><input id="${diemnoi}" class="cell_input" type="text" ></td>
                        <td class="cell"><input id="${diemdoc}" class="cell_input" type="text" ></td>
                        <td class="cell"><input id="${diemviet}" class="cell_input" type="text" ></td>
                    </tr>`
        
        table.innerHTML +=row
    }
}

function xuly_nhapdiem(){
    var url = `https://amesbe.herokuapp.com/api/teacher/class/${sessionStorage.getItem("MaLop")}`
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
    .then(function(json){gv_xuly_nhapdiem(json)})
}

function gv_xuly_nhapdiem(json){
    const data1 = {
        "MaLop": json.LopHoc.MaLop,
        "TenLop": json.LopHoc.TenLop,
    }
    
    const hv =[];
    for (var i=0; i<json.HocVien.length; i++){
        var diemnghe =  'diemnghe'+i;
        var diemnoi =  'diemnoi'+i;
        var diemdoc =  'diemdoc'+i;
        var diemviet =  'diemviet'+i;
        const hv1 = {
            "MaHocVien": json.HocVien[i].MaHocVien,
            "DiemNghe": document.getElementById(diemnghe).value,
            "DiemNoi": document.getElementById(diemnoi).value,
            "DiemDoc": document.getElementById(diemdoc).value,
            "DiemViet": document.getElementById(diemviet).value,
          };
        hv.push(hv1);   
    }
    
    const hocvien = {
        "HocVien": hv,
    }
    
    const data = Object.assign(data1,hocvien);
    console.log(data)

    var url = `https://amesbe.herokuapp.com/api/teacher/score`
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
      console.log(json)
      window.location.replace("./gv_xem_chi_tiet_lop.html")
    })
}

// chỉnh sửa điểm
function gv_chinhsuadiem_json(){
    var url = `https://amesbe.herokuapp.com/api/teacher/class/${sessionStorage.getItem("MaLop")}`
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
    .then(function(json){gv_hienthi_chinhsuadiem(json)})
}

function gv_hienthi_chinhsuadiem(json){
    document.getElementById("malop").innerHTML = json.LopHoc.MaLop;
    document.getElementById("tenlop").innerHTML = json.LopHoc.TenLop;
    document.getElementById("thoigian").innerHTML = json.LopHoc.GioHoc;
    document.getElementById("phong").innerHTML = json.LopHoc.PhongHoc;

    let csd_maHv = []
    for (var i=0;i<json.HocVien.length;i++) {
        csd_maHv[i]=json.HocVien[i].MaHocVien;
    }
    var table = document.getElementById("table_chinhsuadiem")
    for (var i=0; i<json.HocVien.length; i++){
        var row =   `<tr>
                        <td>${i+1}</td>
                        <td>${json.HocVien[i].MaHocVien}</td>
                        <td>${json.HocVien[i].TenHocVien}</td>
                        <td class="cell"><a class="btn btn-sm bg-primary text-white" onclick = "gv_guimhv_chinhsuadiem('${csd_maHv[i]}','${i}')">Chỉnh Sửa</a></td>
                    </tr>`
        
        table.innerHTML +=row
    }
}

function gv_guimhv_chinhsuadiem(csd_mahv,csd_i){
    window.sessionStorage.setItem("csd_MaHV",csd_mahv);
    window.sessionStorage.setItem("csd_i",csd_i);
    window.location.replace("./gv_chi_tiet_chinhsuadiem.html")
}

function gv_chi_tiet_chinhsuadiem(){
    var url = `https://amesbe.herokuapp.com/api/teacher/class/${sessionStorage.getItem("MaLop")}`
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
    .then(function(json){gv_hienthi_ct_chinhsuadiem(json)})
}

function gv_hienthi_ct_chinhsuadiem(json){
    document.getElementById("malop").innerHTML = json.LopHoc.MaLop;
    document.getElementById("tenlop").innerHTML = json.LopHoc.TenLop;
    document.getElementById("thoigian").innerHTML = json.LopHoc.GioHoc;
    document.getElementById("phong").innerHTML = json.LopHoc.PhongHoc;
    
    document.getElementById("maso-hv").value = json.HocVien[sessionStorage.getItem("csd_i")].MaHocVien;
    document.getElementById("hoten-hv").value = json.HocVien[sessionStorage.getItem("csd_i")].TenHocVien;
    document.getElementById("diemnghe-hv").value = json.HocVien[sessionStorage.getItem("csd_i")].DiemNghe;
    document.getElementById("diemnoi-hv").value = json.HocVien[sessionStorage.getItem("csd_i")].DiemNoi;
    document.getElementById("diemdoc-hv").value = json.HocVien[sessionStorage.getItem("csd_i")].DiemDoc;
    document.getElementById("diemviet-hv").value = json.HocVien[sessionStorage.getItem("csd_i")].DiemViet;
}

function xuly_chinhsuadiem(){
    var url = `https://amesbe.herokuapp.com/api/teacher/class/${sessionStorage.getItem("MaLop")}`
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
    .then(function(json){gv_xuly_chinhsuadiem(json)})
}

function gv_xuly_chinhsuadiem(json){
    const data1 = {
        "MaLop": json.LopHoc.MaLop,
        "TenLop": json.LopHoc.TenLop,
    }
    
    const hv =[];
        const hv1 = {
            "MaHocVien": json.HocVien[sessionStorage.getItem("csd_i")].MaHocVien,
            "DiemNghe": document.getElementById("diemnghe-hv").value,
            "DiemNoi": document.getElementById("diemnoi-hv").value,
            "DiemDoc": document.getElementById("diemdoc-hv").value,
            "DiemViet": document.getElementById("diemviet-hv").value,
          };
        hv.push(hv1);   
    
    const hocvien = {
        "HocVien": hv,
    }
    
    const data = Object.assign(data1,hocvien);

    var url = `https://amesbe.herokuapp.com/api/teacher/score`
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
      console.log(json)
      window.location.replace("./gv_xem_chi_tiet_lop.html")
    })
}

//Tìm kiếm
function gv_search(){
    var tieu_chi = document.getElementById("tieu_chi").value
    var search = document.getElementById("search").value
    if (tieu_chi == "ma_hv"){
        var url = `https://amesbe.herokuapp.com/api/teacher/search/ma_hv/${search}`
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
        }).then(function(json){gv_search_hv(json)})
    } else if (tieu_chi == "ten_hv"){
        var url = `https://amesbe.herokuapp.com/api/teacher/search/ten_hv/${search}`
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
        }).then(function(json){gv_search_hv(json)})
    } else if(tieu_chi == "ma_lop"){
        var url = `https://amesbe.herokuapp.com/api/teacher/search/ma_lop/${search}`
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
        }).then(function(json){gv_search_lop(json)})
    }
}

function gv_search_hv(json){
    var table_thead = document.getElementById("table_thead")
    var row_thead = `<tr>
                        <th class="cell">STT</th>
                        <th class="cell">Mã Học Viên</td>
                        <th class="cell">Tên Học Viên</td>
                        <th class="cell">Số Điện Thoại</td>
                    </tr>`

    table_thead.innerHTML =row_thead
    let mahv = []
    for (var i=0;i<json.length;i++) {
        mahv[i]=json[i].TK;
    }

    var table = document.getElementById("table_tbody")
    var row_tbody = "";
    for (var i=0; i<json.length; i++){
        var row =   `<tr>
                        <td>${i+1}</td>
                        <td>${json[i].TK}</td>
                        <td>${json[i].HoTen}</td>
                        <td>${json[i].SDT}</td>
                        <td class="cell"><button class="btn-sm app-btn-secondary" onclick="gv_gui_mhv('${mahv[i]}')">View</button></td>
                    </tr>`
        
        row_tbody +=row
    }
    table.innerHTML = row_tbody;
}

function gv_search_lop(json){
    var table_thead = document.getElementById("table_thead")
    var row_thead = `<tr>
                        <th class="cell">STT</th>
                        <th class="cell">Mã Lớp</td>
                        <th class="cell">Tên Lớp</td>
                        <th class="cell">Thời Gian</td>
                        <th class="cell">Phòng Học</td>
                        <th class="cell">Giảng Viên</td>
                    </tr>`

    table_thead.innerHTML =row_thead

    let malop = []
    for (var i=0;i<json.length;i++) {
        malop[i]=json[i].MaLop;
    }

    var table = document.getElementById("table_tbody")
    var row_tbody = "";
    for (var i=0; i<json.length; i++){
        var row =   `<tr>
                        <td>${i+1}</td>
                        <td>${json[i].MaLop}</td>
                        <td>${json[i].TenLop}</td>
                        <td>${json[i].GioHoc}</td>
                        <td>${json[i].PhongHoc}</td>
                        <td>${json[i].TenGiangVien}</td>
                        <td class="cell"><button class="btn-sm app-btn-secondary" onclick="gv_xemct_lop('${malop[i]}')">View</button></td>
                    </tr>`
        
        row_tbody +=row
    }
    table.innerHTML = row_tbody;
}





