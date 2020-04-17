/**
 * Created by Vincent on 2018/8/6.
 */
import Container from 'components/Container';
import Image from 'components/Image';
import { inject, observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import User from 'stores/User';
import styles from './index.module.scss';
import AddLarge from '../../assets/addLarge.png';
import Add from '../../assets/add.png';
import Reduce from '../../assets/reduce.png';
import Cloth from '../../assets/cloth.png'
import { Button,InputItem,Modal } from 'antd-mobile';

interface DemoProps extends RouteComponentProps {
  user?: User; // injected
}
interface DemoState {
  visible:boolean;
  data:Array<Object>;
  inputValue:string;
  modalStatus:boolean;
}
// @ts-ignore
@withRouter
@inject('user')
@observer
export default class Demo extends Component<DemoProps,DemoState> {
  constructor(props){
    super(props);
    this.state={
      visible:false,
      data:[],
      inputValue:'',
      modalStatus:false
    }
  }
  showShareActionSheetMulpitleLine = () => {
    let visible=!this.state.visible;
    this.setState({visible,inputValue:!visible?'':this.state.inputValue})
  }
  getGoodsNum=val=>this.setState({inputValue:val})
  addCar=()=>{
    const {inputValue}=this.state;
    let data=[...this.state.data]
    if(inputValue.trim()!==''){
      let item=data.filter(ele=>ele['id']===inputValue.trim());
      if(item.length>0){
        data=data.map(ele=>{
          if(ele['id']===inputValue.trim())ele['num']++;
          return ele
        })
      }else{
        data.push({id:inputValue,num:1,name:'男士格子衬衫',price:100})
      }
      this.setState({data,visible:false,inputValue:''})
    }else{
      this.setState({modalStatus:true})
    }
  }
  closeModal=()=>this.setState({modalStatus:false})
  changeNum=(id,val)=>{
    let data=[...this.state.data]
    data=data.map(ele=>{
      if(ele['id']===id)ele['num']=Number(val)===0?1:Number(val);
      return ele
    })
    this.setState({data})
  }
  handleNum=(id,type)=>{
    let data=[...this.state.data]
    data=data.map(ele=>{
      if(ele['id']===id){
        if(type==='reduce')ele['num']--;
        if(type==='add')ele['num']++;
      }
      return ele
    })
    data=data.filter(ele=>ele['num']>0)
    this.setState({data})
  }
  getTotal=()=>{
    const {data}=this.state;
    let arr=data.length>0?data.map(ele=>{
      return ele['num']*ele['price']
    }):[];
    let total=arr.length>0?arr.reduce((x,y)=>Number(x)+Number(y)):0
    return total;
  }
  render() {

    const {visible,inputValue,modalStatus,data}=this.state;
    let total=this.getTotal();

    return (
      <Fragment>
        <Container
          className={styles.container}
          color="white"
          backgroundColor="#3366FF"
        >
        <p>购物车</p>
        <Image
          contain
          src={AddLarge}
          width={30}
          height={30}
          // backgroundColor="white"
          onClick={this.showShareActionSheetMulpitleLine}
        />
        </Container>
        <div className={styles.goods}>
          {
            data.length>0?data.map((ele,index)=>{
              return <div key={index} className={styles.goodsItem}>
              <Image
                contain
                src={Cloth}
                width={90}
                height={90}
              />
              <div className={styles.itemInfo}>
                <div className={styles.infoTop}><span>{ele['name']}</span><span>￥ {ele['num']*ele['price']}</span></div>
                <div className={styles.infoBottom}>
                  <Image
                    contain
                    src={Reduce}
                    width={20}
                    height={20}
                    onClick={()=>this.handleNum(ele['id'],'reduce')}
                  />
                  <InputItem type='digit' value={ele['num']} style={{width:'50px'}} onChange={(val)=>this.changeNum(ele['id'],val)}/>
                  <Image
                    contain
                    src={Add}
                    width={20}
                    height={20}
                    onClick={()=>this.handleNum(ele['id'],'add')}
                  />
                </div>
              </div>
              </div>
            }):null
          }
        </div>
        <div className={styles.totalDiv}>
          <div>
            <div>总价：<span className={styles.totalSmall}>￥{total}</span></div>
            <div>包邮</div>
          </div>
          <div className={styles.total}>
            ￥{total}
          </div>
        </div>
        <div className={styles.action} style={{visibility:visible?'visible':'hidden'}}>
          <InputItem placeholder='请输入商品编号' value={inputValue} onChange={this.getGoodsNum}/>
          <Button type='primary' onClick={this.addCar}>加入购物车</Button>
        </div>
        <Modal
          visible={modalStatus}
          transparent
          maskClosable={false}
          footer={[{ text: '确定', onPress:this.closeModal}]}
        >
          <p>商品编号为空，无法加入购物车！</p>
        </Modal>
      </Fragment>
    );
  }
}
