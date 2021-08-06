import {Table} from 'antd';
import React from "react";
import {request} from "../api/request";

const {Column} = Table;

const datasource = [
]

class RankedTable extends React.Component {
    state={
        data: [],
    }

    componentDidMount() {
        fetch(
            "https://rank.allenji.cn/api/rank",{
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
                },
            }

        )
            .then(res => res.json())
            .then(res => {
                console.log(res)
                res.forEach((item,index) => {
                    datasource.push({
                        key: index+1,
                        rank: index+1,
                        groupName: item.group_name,
                        groupMember: item.member,
                        commentCount: 20,
                        averageComment: item.member/20,
                        updateTime: item.update_time,
                    });
                })
                this.setState({data:datasource})
            })
            .catch(e => console.log('错误:', e))
    }

    render() {
        return (
            <Table dataSource={this.state.data} size="middle">
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