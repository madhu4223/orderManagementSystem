var ResponseUtils = require('./../utils/responseUtils');
file_name = "orderService";
const ordersModel = require('./../models/ordersModel');
module.exports = {
    getOrdersList:function(api_req, api_res){
        
        let Response = new ResponseUtils.response(api_res);
        let Print = new ResponseUtils.print(file_name, "getOrderList");
        try{
            ordersModel.find({status:1},function(err,docs){
                if(err){
                    console.log(err);
                    return Response.error('Error while fetching orders from DB','DBERR',400);
                }else if(!err && docs.length >0){
                    // let responseObject = {
                    //     data : docs
                    // };
                    return Response.success('Successfully got orders',docs);
                }else{
                    return Response.success('No data foud',{},'NODATA');
                }
            });
            
        }catch(exception){
            console.log(exception);
            Print.exception(exception);
            return Response.error("Sorry.. Error with our systems", "INSERR", 400);
        }
    },
    addEditOrder:function(api_req,api_res){
        let Response = new ResponseUtils.response(api_res);
        let Print = new ResponseUtils.print(file_name, "addEditOrder");
        try{
            if(api_req && api_req.body){
                let inputObject = api_req.body;
                if(inputObject.isEdit == true){ // ---------- EDIT ORDER --------
                    let id = inputObject.id;
                    module.exports.isOrderExistWithId(id,function(status){
                        if(status == 1){ /// Exist with id
                            delete inputObject.id;
                            ordersModel.update({_id:id},{$set:inputObject},function(err,updated){
                                if(err){
                                    return Response.error('Error while updating order','DBERR',400);
                                }else{
                                    return Response.success('order updated',{},'SUCCESS');
                                }
                            });
                        }else if(status == 2){ // Not Existed
                            return Response.error('Order not Exist with id','NOEXIST',400);
                        }else{
                            return Response.error('Error occurred internally','INTERNALERR',400);
                        }
                    });
                }else{ /// -------------- NEW ORDER----------
                    delete inputObject['isEdit'];
                    orderModel = new ordersModel(inputObject);
                    orderModel.save(function(err,save){
                        if(err){
                            console.log(err);
                            return Response.error('Error while inserting in DB','INTERNALERR',400);
                        }else{
                            return Response.success('orders added',{},'SUCCESS');
                        }
                    });
                }
            }else {
                return Response.error('Bad Params','BADPARAMS',400);
            }
            
        }catch(exception){
            console.log(exception);
            Print.exception(exception);
            return Response.error("Sorry.. Error with our systems", "INSERR", 400);
        }
    },
    isOrderExistWithId:function(id,callback){
        ordersModel.find({_id:id},function(err,docs){
            if(err){
                console.log(err);
                callback(-1);
            }else if(!err && docs.length > 0){
                callback(1);
            }else{
                callback(2);
            }
        });
    },
    deleteOrder: function(api_req,api_res){
        let Response = new ResponseUtils.response(api_res);
        let Print = new ResponseUtils.print(file_name, "deleteOrder");
        try{
            if(api_req && api_req.body && api_req.body.id){
                console.log('body ',api_req.body)
                let id = api_req.body.id;
                module.exports.isOrderExistWithId(id,function(status){
                    if(status == 1){
                        ordersModel.update({"_id":id},{$set:{status:2}},function(err,updated){
                            if(err){
                                return Response.error('Error while deleting order','DBERR',400);
                            }else{
                                return Response.success('Order deleted',{},'SUCCESS');
                            }
                        });
                    }else{
                        return Response.error('Order not Exist with id','NOEXIST',400);
                    }
            });
            }else{
                return Response.error('Bad Params','BADPARAMS',400);
            }
        }catch(exception){
            console.log(exception);
            Print.exception(exception);
            return Response.error("Sorry.. Error with our systems", "INSERR", 400);
        }
    }
    

};