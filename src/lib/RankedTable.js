import {Table} from 'antd';
import React from "react";
import {request} from "../api/request";

const {Column} = Table;

const datasource = [
    {
        key: '1',
        rank: 1,
        groupName: "豆瓣魂组",
        groupMember: 123,
        commentCount: 666,
        averageComment: 0.25,
        updateTime: "今天",
    },
    {
        key: '2',
        rank: 2,
        groupName: "乃琳",
        groupMember: 100,
        commentCount: 500,
        averageComment: 0.25,
        updateTime: "今天",
    },
]
for (let i = 3; i < 45; i++) {
    datasource.push({
        key: i,
        rank: i,
        groupName: "豆瓣魂组",
        groupMember: 123,
        commentCount: 666,
        averageComment: 0.25,
        updateTime: "今天",
    });
}

class RankedTable extends React.Component {


    componentDidMount() {
        request({
            url: '/api/data',
            method: 'get',
        }).then(function (res) {
            console.log(res)
        })
    }

    render() {
        return (
            <Table dataSource={datasource} >
                <Column title="排名" dataIndex="rank" key="rank"/>
                <Column title="组名" dataIndex="groupName" key="groupName"/>
                <Column title="人数" dataIndex="groupMember" key="groupMember"/>
                <Column title="活跃讨论数" dataIndex="commentCount" key="commentCount"/>
                <Column title="人均讨论数" dataIndex="averageComment" key="averageComment"/>
                <Column title="更新时间" dataIndex="updateTime" key="updateTime"/>
            </Table>
        )
    }
}

export default RankedTable