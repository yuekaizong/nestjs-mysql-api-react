import React, { PropsWithChildren, Dispatch } from 'react';
import { Layout, Menu, Dropdown, Modal } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { storage } from './../../utils';
import { authToken } from '../../config';
import { connect } from 'dva';
import { withRouter, RouteComponentProps } from 'dva/router';
import styles from './index.module.less';
import { CombinedState } from '../../typings';
import { GlobalState } from '../../models/global';

const { Header } = Layout;
const { confirm } = Modal;

type Props = PropsWithChildren<
  RouteComponentProps &
    ReturnType<typeof mapStateToProps> & {
      dispatch: Dispatch<any>;
    }
>;

const AppHeader = (props: Props) => {
  // 退出操作
  const logoutHandler = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: <h3>您确定要退出系统？</h3>,
      onOk() {
        console.log('OK');
        storage.removeItem(authToken);
        setTimeout(() => {
          props.history.push('/login');
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // 打开和关闭左侧菜单按钮事件
  const toggleHandler = () => {
    props.dispatch({ type: 'global/toggleMenusCollapsed' });
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <div>个人设置</div>
      </Menu.Item>
      <Menu.Item>
        <div>修改密码</div>
      </Menu.Item>
      <Menu.Item onClick={logoutHandler}>
        <div>退出</div>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className={styles.app_header} style={{ padding: 0 }}>
      {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggleHandler,
      })}
      <div className={styles.header_view}>
        <div>&nbsp;</div>
        {/* 用户中心 */}
        <div className={styles.user_info}>
          <span>admin</span>
          <Dropdown overlay={menu}>
            <img
              className={styles.avatar}
              src={'http://amin-1302640623.cos.ap-nanjing.myqcloud.com/tmp/cat.jpg'}
              alt="用户头像"
            />
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

const mapStateToProps = (state: CombinedState): GlobalState => state.global;

export default withRouter(connect(mapStateToProps)(AppHeader));
