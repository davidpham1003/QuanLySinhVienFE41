
//Tạo object chứa thông tin request về api từ BE (Lưu ý: các thông tin phải chính xác với BE cung cấp)
var objectAjax = {
    url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien',
    method: 'GET',
    responseType: 'json'
}

var loadDanhSachSinhVien = function () {
    //Dùng thư viện axios gửi thông tin yêu cầu backend trả dữ liệu
    var promise = axios(objectAjax);

    promise.then(function (res) {
        var noiDungTable = '';
        for (var i = 0; i < res.data.length; i++) {
            //Mỗi lần duyệt lấy ra dữ liệu của 1 sinh viên
            var sinhVien = res.data[i];
            //Từ dữ liệu sinh viên => tạo ra thẻ tr
            noiDungTable += `
            <tr>
                <td>${sinhVien.MaSV}</td>
                <td>${sinhVien.HoTen}</td>
                <td>${sinhVien.Email}</td>
                <td>${sinhVien.SoDT}</td>
                <td>${sinhVien.DiemToan}</td>
                <td>${sinhVien.DiemLy}</td>
                <td>${sinhVien.DiemHoa}</td>
                <td>
                <button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.MaSV}')">Xóa</button>
                <button class="btn btn-primary" onclick="chinhSua('${sinhVien.MaSV}')">Sửa</button>
                </td>
            </tr>
        `
        }
        document.getElementById('tblSinhVien').innerHTML = noiDungTable
        console.log(res.data);
    }).catch(function (error) {
        console.log(error)
    })
}

var xoaSinhVien = function (MaSV) {
    var obAjaxXoaSinhVien = {
        url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${MaSV}`,
        method: 'DELETE'
    }
    //Gọi api xóa sinh viên
    axios(obAjaxXoaSinhVien).then(function (res) {
        console.log(res);
        loadDanhSachSinhVien();
    }).catch(function (err) {
        console.log(err);
        loadDanhSachSinhVien();
    })
}




loadDanhSachSinhVien();
//-----------------------------------Chức năng thêm sinh viên --------------------


document.getElementById('btnThemSinhVien').onclick = function () {

    //Tạo đối tượng lấy thông tin người dùng nhập vào
    var sv = new SinhVien();
    sv.MaSV = document.getElementById('MaSV').value;
    sv.HoTen = document.getElementById('HoTen').value;
    sv.Email = document.getElementById('Email').value;
    sv.SoDT = document.getElementById('SoDT').value;
    sv.DiemHoa = document.getElementById('DiemToan').value;
    sv.DiemLy = document.getElementById('DiemLy').value;
    sv.DiemHoa = document.getElementById('DiemHoa').value;
    //tạo object đưa dữ liệu về BE
    var obAxios = {
        url: 'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
        method: 'POST',
        data: sv //sv là dữ liệu đưa về backend xử lý vì vậy cần phải ghi đúng chính xác tên các thuộc tính backend yêu cầu
    }
    //Dùng axios đưa dữ liệu về BE
    axios(obAxios).then(function (res) {
        console.log(res);
        //gọi lại phương thức load danh sách sinh viên mới từ server về
        loadDanhSachSinhVien();
    }).catch(function (err) {
        console.log(err.response.data);
        //gọi lại phương thức load danh sách sinh viên mới từ server về
        loadDanhSachSinhVien();

    })
}
// var chinhSua = function(maSV){
    
//     axios({
//         url: 'http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${maSV}',
//         method: 'GET'
//     }).then(function(res){
//         console.log(res.data);
//         //Dom đến input set giá trị valua đúng thuộc tính
//         var sinhVien = res.data;
//     document.getElementById('maSV').value = sinhVien.maSV;
//     document.getElementById('hoTen').value = sinhVien.TenSV;
//     document.getElementById('email').value = sinhVien.Email;
//     document.getElementById('soDT').value = sinhVien.SoDT;
//      document.getElementById('diemToan').value = sinhVien.DiemToan;
//     document.getElementById('diemLy').value  = sinhVien.DiemLy;
//     document.getElementById('diemHoa').value = sinhVien.DiemHoa;
    
//     }).catch(function(err){
//         console.log(err.response.data);
//     })
// }
// Chức năng cập nhật dữ liệu
document.getElementById('btnCapNhatSinhVien').onclick =function(){
    var sv = new SinhVien();
    sv.MaSV = document.getElementById('MaSV').value;
    sv.HoTen = document.getElementById('HoTen').value;
    sv.Email = document.getElementById('Email').value;
    sv.SoDT = document.getElementById('SoDT').value;
    sv.DiemHoa = document.getElementById('DiemToan').value;
    sv.DiemLy = document.getElementById('DiemLy').value;
    sv.DiemHoa = document.getElementById('DiemHoa').value;
    console.log(sv);
    //Gọi api cập nhật dẽ liệu backend cung cấp
    axios({
        url:'http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien',
        method:'PUT',
        data:sv
    }).then(function(res){
        console.log(res.data);
        loadDanhSachSinhVien();
    }).catch(function(err){
        console.log(err.response.data);
    })


}


