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

  const extraBreadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const isLast = index === pathSnippets.length - 1;
    const name = breadcrumbNameMap[snippet] || snippet;
    const isNotClickable = isLast || snippet === 'detail';
    return {
      key: url,
      title: isNotClickable ? (
        <span style={{ color: '#666' }}>{name}</span>
      ) : (
        <Link to={url}>{name}</Link>
      ),
    };
  });

  const breadcrumbItems = [
    {
      key: 'home',
      title: (
        <Link to="/">
          <HomeOutlined style={{ fontSize: '22px', color: '#000' }} />
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