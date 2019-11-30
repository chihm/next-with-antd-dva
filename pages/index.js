import { connect } from 'react-redux';
import { InputNumber } from 'antd';

const Index = (props) => {
  const count = props.count;

  return (
    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
      <InputNumber
        defaultValue={count}
        onChange={ 
          value => {
            props.dispatch({ type: 'app/caculate', payload: value })
          }
        }
      />
    </div>
  );
}

export default connect(({ app }) => ({ count: app.count }))(Index);
