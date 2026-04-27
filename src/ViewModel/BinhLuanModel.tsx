export interface BinhLuan {
    id:               number;
    ngayBinhLuan:     string;
    noiDung:          string;
    saoBinhLuan:      number;
    tenNguoiBinhLuan: string;
    avatar:           string;
}

export interface thueCongViec {
    id:          number;
    maCongViec:  number;
    maNguoiThue: number;
    ngayThue:    string;
    hoanThanh:   boolean;
}

export interface nguoiBinhLuan {
    id:              number;
    maCongViec:      number;
    maNguoiBinhLuan: number;
    ngayBinhLuan:    string;
    noiDung:         string;
    saoBinhLuan:     number;
}