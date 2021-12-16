import { useState } from "react";
import MyForm from "@/components/form";
import MyPagination from "@/components/pagination";
import MyTable from "@/components/table";
import FeedbackModal from "@/components/modal/feedback";

import { Button, message, Spin } from "antd";
import { getFeedBack, reply } from "@/api";

import "./index.less";

const initFormItems = [
  {
    itemType: "input",
    itemProps: {
      name: "address",
    },
    childProps: {
      placeholder: "搜索地区",
    },
  },
  {
    itemType: "input",
    itemProps: {
      name: "context",
    },
    childProps: {
      placeholder: "搜索内容",
    },
  },
];
export default function FeedBack() {
  const [form, setForm] = useState(null);
  const [pageData, setPageData] = useState({ page: 1 });
  const [tableData, setData] = useState([]);
  const [tableCol, setCol] = useState([]);
  const [load, setLoad] = useState(false);
  const [total, setTotal] = useState(0);
  const [showModal, setModal] = useState(false);
  const [chooseid, setId] = useState(null);
  const menuAction = {
    title: "操作",
    dataIndex: "action",
    align: "center",
    render: (text, record) => {
      if (record.f_back) {
        return "已回复";
      }
      return (
        <Button type="link" onClick={() => show(record.fd_id, true)}>
          回复
        </Button>
      );
    },
  };
  // 显示 关闭 弹窗
  const show = (id, show) => {
    setModal(show);
    setId(id);
  };
  // 获取列表
  const getDataList = (data, isInit = true) => {
    setLoad(true);
    getFeedBack(data)
      .then((res) => {
        const { data, status, mapKey, total } = res;
        if (status === 0) {
          if (isInit) {
            mapKey.forEach((item) => {
              if (
                item.dataIndex === "f_back" ||
                item.dataIndex === "f_context"
              ) {
                item.render = (text) =>
                  text ? (
                    <div
                      className="text"
                      dangerouslySetInnerHTML={{ __html: text }}
                    ></div>
                  ) : (
                    "暂未回复~"
                  );
              }
            });
            mapKey.push(menuAction);
            setCol(mapKey);
          }

          setTotal(total);
          setData(data.map((i) => ({ ...i, key: i.m_id })));
        }
      })
      .finally(() => {
        setLoad(false);
      });
  };

  // 顶部表单搜索
  const search = () => {
    const formData = form.getFieldsValue();
    let params = formData;
    setPageData({ page: 1 });
    getDataList(params, false);
  };
  // 顶部搜索表单重置
  const reset = () => {
    form.resetFields();
    search();
  };
  // 页码改版
  const pageChange = (pageData) => {
    let data = form.getFieldsValue();
    getDataList({ ...pageData, ...data }, false);
    setPageData(pageData);
  };
  // 回复
  const gotoReply = (data) => {
    reply(data).then((res) => {
      const { status, msg } = res;
      if (status === 0) {
        message.success(msg);
        show(null, false);
        search();
      }
    });
  };
  return (
    <div className="feedback-container">
      <Spin spinning={load}>
        <MyForm layout="inline" handleInstance={setForm} items={initFormItems}>
          <Button type="primary" onClick={search}>
            搜索
          </Button>
          <Button className="reset" onClick={reset}>
            重置
          </Button>
        </MyForm>
        <MyTable
          dataSource={tableData}
          columns={tableCol}
          pagination={false}
          rowKey="fd_id"
          saveKey="feedbackTable"
        />
        <MyPagination
          page={pageData.page}
          immediately={getDataList}
          change={pageChange}
          total={total}
        />
        <FeedbackModal
          id={chooseid}
          isShow={showModal}
          onSubmit={gotoReply}
          onCancel={show}
        />
      </Spin>
    </div>
  );
}
FeedBack.route = {
  path: "/statistics/feedback",
};
