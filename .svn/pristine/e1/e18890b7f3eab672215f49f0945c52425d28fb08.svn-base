<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="品牌" prop="brandName">
        <el-input
          v-model="queryParams.brandName"
          placeholder="请输入品牌"
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
          v-hasPermi="['fertilizer:add']"
        >新增</el-button>
      </el-col>
   <!--   <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate(scope.row)"
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
          v-hasPermi="['fertilizer:remove']"
        >删除</el-button>
      </el-col>
     <!-- <el-col :span="1.5">
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
      <el-table-column label="品牌名称" align="center" prop="brandName" />
      <el-table-column label="代理经销商" align="center" prop="resellers" />
      <el-table-column label="手机号码" align="center" prop="phone" />
      <el-table-column label="供应地址" align="center" prop="supplyAddress" />
      <el-table-column label="详细地址" align="center" prop="detailedAddress" />
      <el-table-column label="肥料分类" align="center" prop="fertilizerClassification" />
      <el-table-column label="批发价" align="center" prop="wholesalePrice" />
      <el-table-column label="规格" align="center" prop="specification" />
      <el-table-column label="运输方式" align="center" prop="methods" />
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
            v-hasPermi="['fertilizer:edit']"
          >修改</el-button>
         <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:post:remove']"
          >删除</el-button>-->
          <el-button
            v-if="scope.row.status ==1"
            size="mini"
            type="text"
            icon="el-icon-success"
            @click="handlePass(scope.row)"
            v-hasPermi="['fertilizer:past']"
          >通过审核
          </el-button>
          <el-button
            v-if="scope.row.status ==1||scope.row.status==3"
            size="mini"
            type="text"
            icon="el-icon-close"
            @click="handleBack(scope.row)"
            v-hasPermi="['fertilizer:back']"
          >审核不通过
          </el-button>
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
        <el-form-item label="品牌名称" prop="brandName">
          <el-input v-model="form.brandName" placeholder="请输入品牌名称" />
        </el-form-item>
        <el-form-item label="代理经销商" prop="resellers">
          <el-input v-model="form.resellers" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="号码" prop="resellers">
          <el-input v-model="form.phone" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="供应地址" prop="supplyAddress">
          <v-distpicker :province="temp.address__province" :city="temp.address__city" :area="temp.address__dist"
                        @selected="onSelected"></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailedAddress">
          <el-input v-model="form.detailedAddress" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="肥料分类" prop="fertilizerClassification">
          <template>
            <el-select v-model="form.fertilizerClassification" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="批发价" prop="wholesalePrice">
          <el-input-number v-model="form.wholesalePrice" controls-position="right" :min="0" />元/袋
        </el-form-item>
        <el-form-item label="规格" prop="specification">
          <el-input-number v-model="form.specification" controls-position="right" :min="0" />kg/袋
        </el-form-item>

        <el-form-item label="运输方式" prop="methods">
          <template>
            <el-select v-model="form.methods" placeholder="请选择">
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
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

      <!--  <el-form-item label="图片上传" prop="image">
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

        <el-form-item label="营业执照上传" prop="businessLicense">
          <el-upload
            ref="my-upload2"
            :action="uploadImgUrl"
            list-type="picture-card"
            :limit=1
            v-model="form.businessLicense"
            :on-preview="handlePictureCardPreview1"
            :on-success="handleSuccess1"
            :on-remove="handleRemove1">

            <img v-if="vis" :src="form.businessLicense" style="height: 145px;width: 143px;">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

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
  import { listFei, addFei, getFei, updateBasket, updatePost, passFeiLiao,backFeiLiao,delFeiliao } from "@/api/selling/feiliao";

  export default {
    components: {VDistpicker},
    //多图片上传

    name: "Post",
    data() {
      return {
        options: [{
          value: '复合肥',
          label: '复合肥'
        }, {
          value: '连肥',
          label: '连肥'
        }, {
          value: '有机肥',
          label: '有机肥'
        },
          {
            value: '其他',
            label: '其他'
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
        //城市组件
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
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
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
          images: [
            {required: true, message: "图片不能为空", trigger: "blur"}
          ],
          brandName: [
            {required: true, message: "品牌名称不能为空", trigger: "blur"}
          ],
          resellers: [
            {required: true, message: "代理经销商不能为空", trigger: "blur"}
          ],
          supplyAddress: [
            {required: true, message: "供应地址不能为空", trigger: "blur"}
          ],
          detailedAddress: [
            {required: true, message: "详细地址不能为空", trigger: "blur"}
          ],
          fertilizerClassification: [
            {required: true, message: "肥料分类不能为空", trigger: "blur"}
          ],
          wholesalePrice: [
            {required: true, message: "批发价不能为空", trigger: "blur"}
          ],
          specification: [
            {required: true, message: "规格不能为空", trigger: "blur"}
          ],
          methods: [
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
        listFei(this.queryParams).then(response => {
          this.postList = response.rows;
          console.log("shuju"+this.postList)
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
          postId: undefined,
          postCode: undefined,
          postName: undefined,
          postSort: 0,
          status: "0",
          remark: undefined
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
        this.title = "添加";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.$nextTick(()=>{
          this.$refs['my-upload2'].clearFiles();
          this.reset();

        })
        this.vis=true;
        const postId = row.id || this.ids
        getFei(postId).then(response => {
          this.form = response.result;
          console.log("message"+this.form);
          let imgs = []
          this.form.moreImage.forEach((item)=>{
            imgs.push({url:item})
          })
          console.log(imgs,"回显")
          this.form.moreImage = imgs
          if (response.result.supplyAddress != null && response.result.supplyAddress != '') {
            const list = response.result.supplyAddress.split('-')
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
                brandName:this.form.brandName,
                resellers:this.form.resellers,
                phone:this.form.phone,
                supplyAddress:this.form.supplyAddress,
                detailedAddress:this.form.detailedAddress,
                fertilizerClassification:this.form.fertilizerClassification,
                wholesalePrice:this.form.wholesalePrice,
                specification:this.form.specification,
                businessLicense:this.form.businessLicense,
                methods:this.form.methods,
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
                brandName:this.form.brandName,
                resellers:this.form.resellers,
                phone:this.form.phone,
                supplyAddress:this.form.supplyAddress,
                detailedAddress:this.form.detailedAddress,
                fertilizerClassification:this.form.fertilizerClassification,
                wholesalePrice:this.form.wholesalePrice,
                specification:this.form.specification,
                businessLicense:this.form.businessLicense,
                methods:this.form.methods,
                images:this.form.images

              }
              addFei(upload).then(response => {
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
        const postIds = row.id || this.ids;
        this.$confirm('是否确认删除编号为"' + postIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delFeiliao(postIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
      },
      handlePass(row) {
        const postIds = row.id || this.ids;
        this.$confirm('是否确认通过编号为"' + postIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return passFeiLiao(postIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("通过成功");
        }).catch(function() {});
      },
      //驳回
      handleBack(row) {
        const postIds = row.id || this.ids;
        this.$confirm('是否确认驳回为"' + postIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return backFeiLiao(postIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("驳回成功");
        }).catch(function() {});
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
        console.log(response.result,"3a")

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
        this.form.businessLicense = file.result;
        this.vis = false;
        this.$message.success('图片上传成功');
      },

      //城市下拉
      onSelected(data) {
        this.temp.address__province = data.province.value
        this.temp.address__city = data.city.value
        this.temp.address__dist = data.area.value
        this.form.supplyAddress = this.temp.address__province +"-"+ this.temp.address__city +"-"+ this.temp.address__dist
      }


    }
  };
</script>
