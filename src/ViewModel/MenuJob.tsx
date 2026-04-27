export interface MenuJobItem{
    id:                number;
    tenLoaiCongViec:   string;
    dsNhomChiTietLoai: DSNhomChiTietLoai[];
}

export type DSNhomChiTietLoai={
    id:             number;
    tenNhom:        string;
    hinhAnh:        string;
    maLoaiCongviec: number;
    dsChiTietLoai:  DSChiTietLoai[];
}

export type DSChiTietLoai={
    id:         number;
    tenChiTiet: string;
}