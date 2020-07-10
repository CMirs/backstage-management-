<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="queryParams.username"
          placeholder="请输入姓名"
          clearable
          size="small"
          style="width: 240px"
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
        <el-select
          v-model="queryParams.status"
          placeholder="状态"
          clearable
          size="small"
          style="width: 240px"
        >
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
          v-hasPermi="['pineapple:add']"
        >新增
        </el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-plus"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['pineapple:remove']"
        >删除
        </el-button>
      </el-col>
      <!--  <el-col :span="1.5">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['activity:edit']"
          >修改
          </el-button>
        </el-col>-->
      <!--   <el-col :span="1.5">
           <el-button
             type="danger"
             icon="el-icon-delete"
             size="mini"
             :disabled="single"
             @click="handleDelete"
             v-hasPermi="['activity:remove']"
           >删除
           </el-button>
         </el-col>-->
    </el-row>

    <el-table v-loading="loading" :data="LandList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="标题" align="center" prop="caption" :show-overflow-tooltip="true"/>
      <el-table-column label="姓名" align="center" prop="username" :show-overflow-tooltip="true"/>
      <el-table-column label="电话" align="center" prop="phone" :show-overflow-tooltip="true"/>
      <el-table-column label="地址位置" align="center" prop="addressLocation" :show-overflow-tooltip="true"/>
      <el-table-column label="详细地址" align="center" prop="detailedAddress" :show-overflow-tooltip="true"/>
      <el-table-column label="发包价" align="center" prop="contractPrice" :show-overflow-tooltip="true"/>
      <el-table-column label="种植面积" align="center" prop="cultivatedArea" :show-overflow-tooltip="true"/>
      <el-table-column label="种植时间" align="center" prop="cultivatedTime" :show-overflow-tooltip="true"/>
      <el-table-column label="上市时间" align="center" prop="marketTime" :show-overflow-tooltip="true"/>
      <el-table-column label="预计产量" align="center" prop="anticipatedOutput" :show-overflow-tooltip="true"/>
      <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat"/>
      <el-table-column label="创建时间" align="center" prop="created" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.created) }}</span>
        </template>
      </el-table-column>

      <!--  <el-table-column label="图片" align="center" height="10px">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              &lt;!&ndash;            <img :src="scope.row.picture" />&ndash;&gt;
              <img slot="reference" :src="scope.row.image" :alt="scope.row.image" style="max-height: 50px;max-width: 130px">
            </el-popover>
          </template>
        </el-table-column>-->

      <!--      <el-table-column label="代言图片" align="center" prop="picture" :show-overflow-tooltip="true"/>-->
      <!--<el-table-column label="状态" align="center" prop="status" :formatter="statusFormat"/>-->

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pineapple:edit']"
          >修改
          </el-button>
         <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['land:remove']"
          >删除
          </el-button>-->
          <el-button
            v-if="scope.row.status ==1"
            size="mini"
            type="text"
            icon="el-icon-success"
            @click="handlePass(scope.row)"
            v-hasPermi="['pineapple:past']"
          >通过审核
          </el-button>
          <el-button
            v-if="scope.row.status ==1||scope.row.status==3"
            size="mini"
            type="text"
            icon="el-icon-close"
            @click="handleBack(scope.row)"
            v-hasPermi="['pineapple:back']"
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

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title1" :visible.sync="open" width="600px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="caption">
          <el-input v-model="form.caption" placeholder="请标题" maxlength="20" show-word-limit=""/>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="form.username" placeholder="输入姓名"/>
        </el-form-item>

        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone" placeholder="输入手机号码"/>
        </el-form-item>

        <el-form-item label="地址位置" prop="addressLocation">
          <v-distpicker :province="temp.address__province" :city="temp.address__city" :area="temp.address__dist"
                        @selected="onSelected"></v-distpicker>
        </el-form-item>


        <el-form-item label="详细地址" prop="detailedAddress">
          <el-input v-model="form.detailedAddress" placeholder="输入主体权属"/>
        </el-form-item>

        <el-form-item label="发包价" prop="contractPrice">
          <el-input-number type="contractPrice" v-model="form.contractPrice" placeholder="输入发包价"/>元/亩
        </el-form-item>

        <el-form-item label="种植面积" prop="cultivatedArea">
          <el-input-number v-model="form.cultivatedArea" placeholder="输入土地现状"/>亩
        </el-form-item>

        <el-form-item label="种植时间" prop="cultivatedTime">
          <el-date-picker
            v-model="form.cultivatedTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="上市时间" prop="marketTime">
          <el-date-picker
            v-model="form.marketTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>




        <el-form-item label="预计产量" prop="anticipatedOutput">
          <el-input-number v-model="form.anticipatedOutput" placeholder="输入土地现状"/>亩
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

    <!--    <el-form-item label="图片上传" prop="image">
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
  import {listpineapple, insertpineapple, updatePineapple,getpineapple,delPineapple,passpineapple,backpineapple} from "@/api/selling/pineapple";


  export default {
    components: {VDistpicker},
    name: "Dict",
    data() {
      return {
        //多图片上传
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        dialogImageUrl: '',
        dialogVisible: false,
        //上传的图片服务器地址
        uploadImgUrl: process.env.VUE_APP_BASE_API + "/image/imageUpload", // 上传的图片服务器地址
        temp: {
          address__province: '',
          address__city: '',
          address__dist: '',
        },
        num:1,
        // 遮罩层
        vis:false,
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        // 菜单表格树数据
        LandList: [],
        // 弹出层标题
        title1: "",
        // 是否显示弹出层
        open: false,
        // 状态数据字典
        statusOptions: [],
        // 日期范围
        dateRange: [],

        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,

          name: undefined,

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
          addressLocation: [
            {required: true, message: "地址位置不能为空", trigger: "blur"}
          ],
          detailedAddress: [
            {required: true, message: "详细地址不能为空", trigger: "blur"}
          ],
          contractPrice: [
            {required: true, message: "发包价不能为空", trigger: "blur"}
          ],
          cultivatedArea: [
            {required: true, message: "种植面积不能为空", trigger: "blur"}
          ],
          cultivatedTime: [
            {required: true, message: "种植时间不能为空", trigger: "blur"}
          ],
          marketTime: [
            {required: true, message: "上市时间不能为空", trigger: "blur"}
          ],
          anticipatedOutput: [
            {required: true, message: "预计产量不能为空", trigger: "blur"}
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
      /** 查询土地出租列表 */
      getList() {
        listpineapple(this.queryParams).then(response => {

            this.LandList = response.rows;

            this.total = response.total;

            this.loading = false;

          }
        );
      },
      // 字典状态字典翻译
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
          activityName: null,
          status: null,
          image:null
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
        this.dateRange = [];
        this.resetForm("queryForm");
        this.handleQuery();
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.$nextTick(()=>{
          this.$refs['my-upload3'].clearFiles();
          this.reset();

        })
        this.open = true;
        this.title1 = "添加";
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length != 1
        this.multiple = !selection.length
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        this.vis=true;
        const landId = row.id
        getpineapple(landId).then(response => {

          this.form = response.result;
          let imgs = []
          this.form.moreImage.forEach((item)=>{
            imgs.push({url:item})
          })
          console.log(imgs,"回显")
          this.form.moreImage = imgs

          if (response.result.addressLocation != null && response.result.addressLocation != '') {
            const list = response.result.addressLocation.split('-')
            this.temp.address__province = list[0]
            this.temp.address__city = list[1]
            this.temp.address__dist = list[2]
          }
          this.open = true;
          this.title1 = "修改";
        });
      },
      /** 提交按钮 */
      submitForm: function () {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != undefined) {
              let upload = {
                id:this.form.id,
                caption:this.form.caption,
                username:this.form.username,
                phone:this.form.phone,
                addressLocation:this.form.addressLocation,
                detailedAddress:this.form.detailedAddress,
                contractPrice:this.form.contractPrice,
                cultivatedArea:this.form.cultivatedArea,
                cultivatedTime:this.form.cultivatedTime,
                marketTime:this.form.marketTime,
                anticipatedOutput:this.form.anticipatedOutput,
                images:this.form.images

              }
              updatePineapple(upload).then(response => {
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
                id:this.form.id,
                caption:this.form.caption,
                username:this.form.username,
                phone:this.form.phone,
                addressLocation:this.form.addressLocation,
                detailedAddress:this.form.detailedAddress,
                contractPrice:this.form.contractPrice,
                cultivatedArea:this.form.cultivatedArea,
                cultivatedTime:this.form.cultivatedTime,
                marketTime:this.form.marketTime,
                anticipatedOutput:this.form.anticipatedOutput,
                images:this.form.images

              }
              insertpineapple(upload).then(response => {
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
        this.$confirm('是否确认删除"' + dictIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delPineapple(dictIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function () {
        });
      },
      handlePass(row) {
        const dictIds = row.id || this.ids;
        this.$confirm('是否确认通过"' + dictIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return passpineapple(dictIds);
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
          return backpineapple(dictIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("驳回成功");
        }).catch(function () {
        });
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

      //城市下拉
      onSelected(data) {
        this.temp.address__province = data.province.value
        this.temp.address__city = data.city.value
        this.temp.address__dist = data.area.value
        this.form.addressLocation = this.temp.address__province +"-"+ this.temp.address__city +"-"+ this.temp.address__dist
      }



    }
  };
</script>
