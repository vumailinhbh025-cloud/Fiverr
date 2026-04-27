import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const AppBreadcrumb: React.FC = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const breadcrumbNameMap: Record<string, string> = {
    'danhSachCongViec': 'Danh sách công việc',
    'chiTietCongViec': 'Chi tiết công việc',
    'admin': 'Quản trị',
  };

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const isLast = index === pathSnippets.length - 1;
    const name = breadcrumbNameMap[pathSnippets[index]] || pathSnippets[index];

    return {
      key: url,
      title: isLast ? name : <Link to={url}>{name}</Link>,
    };
  });

  // 4. Luôn thêm icon Trang chủ ở đầu
  const breadcrumbItems = [
    {
      key: 'home',
      title: (
        <Link to="/">
          <HomeOutlined style={{ fontSize: '22px', color: '#000' }}/>
        </Link>
      ),
    },
    ...extraBreadcrumbItems,
  ];

  return (
    <div style={{ 
    padding: '12px', 
    marginBottom: '25px',
    background: '#fff'
  }}>
    <Breadcrumb 
      separator="/"
      items={breadcrumbItems} 
      style={{ fontSize: '20px' }}
    />
  </div>
  );
};

export default AppBreadcrumb;