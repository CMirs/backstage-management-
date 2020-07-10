<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="queryParams.username"
          placeholder="请输入姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="号码" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['basket:add']"
        >新增</el-button>
      </el-col>
      <!--<el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:post:edit']"
        >修改</el-button>
      </el-col>-->
       <el-col :span="1.5">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['basket:remove']"
          >删除
          </el-button>
        </el-col>
      <!--    <el-col :span="1.5">
            <el-button
              type="warning"
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              v-hasPermi="['system:post:export']"
            >导出</el-button>
          </el-col>-->
    </el-row>

    <el-table v-loading="loading" :data="postList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="标题" align="center" prop="caption" :show-overflow-tooltip="true"/>
      <el-table-column label="姓名" align="center" prop="username" />
      <el-table-column label="号码" align="center" prop="phone" />
      <el-table-column label="厂家名称" align="center" prop="factoryName" />
      <el-table-column label="厂家地址" align="center" prop="factoryAddress" />
      <el-table-column label="详细地址" align="center" prop="detailedAddress" />
      <el-table-column label="箩筐规格" align="center" prop="specification" />
      <el-table-column label="单价(元)" align="center" prop="price" >
        <template slot-scope="scope">
         <span>{{scope.row.price}}元</span>
        </template>
      </el-table-column>
      <el-table-column label="库存(个)" align="center" prop="num" >
        <template slot-scope="scope">
          <span>{{scope.row.num}}个</span>
        </template>
      </el-table-column>
      <el-table-column label="运输方式" align="center" prop="manner" />
      <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.created) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basket:edit']"
          >修改</el-button>
          <el-button
            v-if="scope.row.status ==1"
            size="mini"
            type="text"
            icon="el-icon-success"
            @click="handlePass(scope.row)"
            v-hasPermi="['basket:past']"
          >通过审核
          </el-button>
          <el-button
            v-if="scope.row.status ==1||scope.row.status==3"
            size="mini"
            type="text"
            icon="el-icon-close"
            @click="handleBack(scope.row)"
            v-hasPermi="['basket:back']"
          >审核不通过
          </el-button>
        <!--  <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:post:remove']"
          >删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改岗位对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="caption">
          <el-input v-model="form.caption" placeholder="请输入标题" maxlength="20" show-word-limit="" />
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="form.username" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="号码" prop="phone">
          <el-input v-model="form.phone" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="厂家名称" prop="factoryName">
          <el-input v-model="form.factoryName" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="厂家地址" prop="factoryAddress">
          <v-distpicker :province="temp.address__province" :city="temp.address__city" :area="temp.address__dist"
                        @selected="onSelected"></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailedAddress">
          <el-input v-model="form.detailedAddress" controls-position="right" :min="0" />
        </el-form-item>
        <!--  <el-form-item label="箩筐规格" prop="specification">
            <el-input v-model="form.specification" controls-position="right" :min="0" />
          </el-form-item>-->
        <el-form-item label="箩筐规格" prop="price">
          <template>
            <el-select v-model="form.specification" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input-number v-model="form.price" controls-position="right" :min="0" />元
        </el-form-item>
        <el-form-item label="库存" prop="num">
          <el-input-number v-model="form.num" controls-position="right" :min="0" />个
        </el-form-item>
        <el-form-item label="运输方式" prop="manner">
          <template>
            <el-select v-model="form.manner" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>

        <el-form-item label="图片上传" prop="images">
          <el-upload
            ref="my-upload3"
            class="upload-demo"
            :action="uploadImgUrl"
            :on-preview="handlePreview"
            :limit=5
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="form.moreImage"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，最多上传5张</div>
          </el-upload>
        </el-form-item>

        <!-- <el-form-item label="图片上传" prop="image">
           <el-upload
             :action="uploadImgUrl"
             list-type="picture-card"
             :limit=3
             v-model="form.image"
             :on-preview="handlePictureCardPreview"
             :on-success="handleSuccess"
             :on-remove="handleRemove">

             <img v-if="vis" :src="form.image" style="height: 145px;width: 143px;">
             <i class="el-icon-plus"></i>
           </el-upload>
         </el-form-item>-->

        <el-form-item label="营业执照上传" prop="tradingCertificate">
          <el-upload
            ref="my-upload2"
            :action="uploadImgUrl"
            list-type="picture-card"
            :limit=1
            v-model="form.tradingCertificate"
            :on-preview="handlePictureCardPreview1"
            :on-success="handleSuccess1"
            :on-remove="handleRemove1">

            <img v-if="vis" :src="form.tradingCertificate" style="height: 145px;width: 143px;">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <!--  <el-form-item label="岗位状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictValue"
              >{{dict.dictLabel}}</el-radio>
            </el-radio-group>
          </el-form-item>-->
        <!-- <el-form-item label="备注" prop="remark">
           <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
         </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import VDistpicker from 'v-distpicker'
  import { listBasket, addBasket, getBasket, updateBasket, exportPost,passBasket,removeBasket,backBasket } from "@/api/selling/basket";

  export default {
    components: {VDistpicker},
    name: "basket",
    data() {
      return {
        options: [{
          value: '20斤装',
          label: '20斤装'
        }, {
          value: '25斤装',
          label: '25斤装'
        }, {
          value: '32斤装',
          label: '32斤装'
        },],
        value: '',
        options1: [{
          value: '自提',
          label: '自提'
        }, {
          value: '厂家配送',
          label: '厂家配送'
        },
        ],
        value: '',
        //多图片上传
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        temp: {
          address__province: '',
          address__city: '',
          address__dist: '',
        },
        dialogImageUrl: '',
        dialogVisible: false,
        vis:false,
        //上传的图片服务器地址
        uploadImgUrl: process.env.VUE_APP_BASE_API + "/image/imageUpload", // 上传的图片服务器地址
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        // 箩筐表格数据
        postList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 状态数据字典
        statusOptions: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          postCode: undefined,
          postName: undefined,
          status: undefined
        },
        // 表单参数
        form: {images:[]},
        // 表单校验
        rules: {
          caption: [
            {required: true, message: "标题不能为空", trigger: "blur"}
          ],
          phone: [
            {required: true,
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: "请输入正确的手机号码",
              trigger: "blur"}
          ],
          username: [
            {required: true, message: "姓名不能为空", trigger: "blur"}
          ],
          images: [
            {required: true, message: "图片不能为空", trigger: "blur"}
          ],
          factoryName: [
            {required: true, message: "厂家名称不能为空", trigger: "blur"}
          ],
          factoryAddress: [
            {required: true, message: "厂家地址不能为空", trigger: "blur"}
          ],
          detailedAddress: [
            {required: true, message: "详细地址不能为空", trigger: "blur"}
          ],
          specification: [
            {required: true, message: "箩筐规格不能为空", trigger: "blur"}
          ],
          price: [
            {required: true, message: "单价不能为空", trigger: "blur"}
          ],
          num: [
            {required: true, message: "库存不能为空", trigger: "blur"}
          ],
          manner: [
            {required: true, message: "运输方式不能为空", trigger: "blur"}
          ],

        }
      };
    },
    created() {
      this.getList();
      this.getDicts("land_status").then(response => {
        this.statusOptions = response.data;
      });
    },
    methods: {
      /** 查询岗位列表 */
      getList() {
        this.loading = true;
        listBasket(this.queryParams).then(response => {
          this.postList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 岗位状态字典翻译
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.status);
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.temp= {
          address__province: '',
          address__city: '',
          address__dist: '',
        },
          this.form = {
            status: null,
            images: [],
            tradingCertificate:null
          };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length!=1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.$nextTick(()=>{
          this.$refs['my-upload3'].clearFiles();
          this.reset();

        })
        this.$nextTick(()=>{
          this.$refs['my-upload2'].clearFiles();
          this.reset();

        })
        this.open = true;
        this.title = "添加箩筐";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.$nextTick(()=>{
          this.$refs['my-upload2'].clearFiles();
          this.reset();

        })
        this.vis=true;
        const postId = row.id || this.ids
        getBasket(postId).then(response => {
          this.form = response.result;
          console.log("message"+this.form);
          let imgs = []
          this.form.moreImage.forEach((item)=>{
            imgs.push({url:item})
          })
          console.log(imgs,"回显")
          this.form.moreImage = imgs

          if (response.result.factoryAddress != null && response.result.factoryAddress != '') {
            const list = response.result.factoryAddress.split('-')
            this.temp.address__province = list[0]
            this.temp.address__city = list[1]
            this.temp.address__dist = list[2]
          }

          this.open = true;
          this.title = "修改箩筐";
        });
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != undefined) {
              let upload = {
                id:this.form.id,
                caption:this.form.caption,
                username:this.form.username,
                phone:this.form.phone,
                factoryName:this.form.factoryName,
                factoryAddress:this.form.factoryAddress,
                detailedAddress:this.form.detailedAddress,
                specification:this.form.specification,
                price:this.form.price,
                num:this.form.num,
                manner:this.form.manner,
                tradingCertificate:this.form.tradingCertificate,
                images:this.form.images

              }
              updateBasket(upload).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                } else {
                  this.msgError(response.msg);
                }
              });
            } else {
              let upload = {
                caption:this.form.caption,
                username:this.form.username,
                phone:this.form.phone,
                factoryName:this.form.factoryName,
                factoryAddress:this.form.factoryAddress,
                detailedAddress:this.form.detailedAddress,
                specification:this.form.specification,
                price:this.form.price,
                num:this.form.num,
                manner:this.form.manner,
                tradingCertificate:this.form.tradingCertificate,
                images:this.form.images

              }
              addBasket(upload).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("新增成功");
                  this.open = false;
                  this.getList();
                } else {
                  this.msgError(response.msg);
                }
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const dictIds = row.id || this.ids;
        console.log(this.dictIds+"1231231")
        this.$confirm('是否确认删除"' + dictIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return removeBasket(dictIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function () {
        });
      },
      /**通过审核*/
      handlePass(row) {
        const dictIds = row.id || this.ids;
        this.$confirm('是否确认通过"' + dictIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return passBasket(dictIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("通过成功");
        }).catch(function () {
        });
      },
      handleBack(row) {
        const dictIds = row.id || this.ids;
        this.$confirm('是否确认驳回"' + dictIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return backBasket(dictIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("驳回成功");
        }).catch(function () {
        });
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm('是否确认导出所有岗位数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportPost(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
      },


      //图片上传
      handleRemove(file,fileList) {
        console.log(fileList);
        if(this.form.id){
          let s=[]
          fileList.forEach((item)=>{
            if(item.url){
              s.push(item.url)
            }
          })
          console.log(s,"新增移除组装")
          this.form.images = s
        }else{
          let s=[]
          fileList.forEach((item)=>{
            if(item.response.result){
              s.push(item.response.result)
            }
          })
          console.log(s,"修改移除组装")
          this.form.images = s


        }

      },
      handlePreview(file) {
        console.log("666")
        console.log(file);
        // this.form.image= file.result;
      },
      handleSuccess(response, file, fileList){
        console.log(response.result,this.form.images,"3a")

        this.form.images.push(response.result)
        console.log(this.form.images,"新增")
      },




//营业执照上传
      handleRemove1(file, fileList) {
        console.log(file, fileList);
      },

      handlePictureCardPreview1(file) {
        console.log("111111"+file.result);
        this.tradingCertificate = file.result;

      },
      handleSuccess1(file) {
        // console.log("22222222"+JSON.stringify(file));
        this.form.tradingCertificate = file.result;
        this.vis = false;
        this.$message.success('图片上传成功');
      },



      onSelected(data) {
        this.temp.address__province = data.province.value
        this.temp.address__city = data.city.value
        this.temp.address__dist = data.area.value
        this.form.factoryAddress = this.temp.address__province +"-"+ this.temp.address__city +"-"+ this.temp.address__dist
      }




    }
  };
</script>
