import {Table} from 'antd';
import React from "react";

const {Column} = Table;

const datasource = []

class RankedTable extends React.Component {
    state = {
        data: [],
    }

    componentDidMount() {
        fetch(
            "https://rank.allenji.cn/api/rank", {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            }
        )
            .then(res => res.json())
            .then(res => {
                res.forEach((item, index) => {
                    datasource.push({
                        key: index + 1,
                        rank: index + 1,
                        groupName: item.group_name,
                        groupMember: item.member,
                        commentCount: item.comment,
                        averageComment: (item.comment/item.member).toFixed(2),
                        updateTime: item.update_time,
                        groupUrl:item.group_url,
                    });
                })
                this.setState({data: datasource})
            })
            .catch(e => console.log('错误:', e))
    }

    render() {
        return (
            <Table dataSource={this.state.data} size="middle" pagination={{defaultPageSize: 50,}}>
                <Column title="排名" dataIndex="rank" key="rank" align="center"/>
                <Column title="组名" dataIndex="groupName" key="groupName" render={(text, record, index)=> {
                    return <a href={this.state.data[index].groupUrl} target="_blank">{text}</a>
                }}/>
                <Column title="人数" dataIndex="groupMember" key="groupMember" align="center"/>
                <Column title="活跃讨论数" dataIndex="commentCount" key="commentCount" align="center"/>
                <Column title="人均讨论数" dataIndex="averageComment" key="averageComment" align="center"/>
                <Column title="更新时间" dataIndex="updateTime" key="updateTime" align="center"/>
            </Table>
        )
    }
}

export default RankedTable