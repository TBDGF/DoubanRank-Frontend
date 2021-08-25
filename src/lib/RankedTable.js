import {Table} from 'antd';
import React from "react";

const {Column} = Table;

class RankedTable extends React.Component {


    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Table dataSource={this.props.rank} size="middle" pagination={{defaultPageSize: this.props.pageSize,}}>
                    <Column title="排名" dataIndex="rank" key="rank" align="center"/>
                    <Column title="组名" dataIndex="groupName" key="groupName" render={(text, record, index) => {
                        return <a href={record.groupUrl} target="_blank">{text}</a>
                    }}/>
                    <Column title="人数" dataIndex="groupMember" key="groupMember" align="center"
                            responsive={['md', 'lg']}/>
                    <Column title="活跃讨论数" dataIndex="commentCount" key="commentCount" align="center"
                            sorter={(rowA, rowB) => {
                                return rowA.commentCount - rowB.commentCount
                            }}/>
                    <Column title="人均讨论数" dataIndex="averageComment" key="averageComment" align="center"
                            sorter={(rowA, rowB) => {
                                return rowA.averageComment - rowB.averageComment
                            }}/>
                    <Column title="更新时间" dataIndex="updateTime" key="updateTime" align="center"
                            responsive={['md', 'lg']}/>
                </Table>
            </div>

        )
    }
}

export default RankedTable