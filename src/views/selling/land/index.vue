<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="queryParams.name"
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
  <!--    <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>-->
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
          v-hasPermi="['land:add']"
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
          v-hasPermi="['land:remove']"
        >删除
        </el-button>
      </el-col>
    <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['Dict:edit']"
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
          v-hasPermi="['Dict:remove']"
        >删除
        </el-button>
      </el-col>-->
    </el-row>

    <el-table v-loading="loading" :data="LandList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="标题" align="center" prop="caption" :show-overflow-tooltip="true"/>
      <el-table-column label="姓名" align="center" prop="name" :show-overflow-tooltip="true"/>
      <el-table-column label="电话" align="center" prop="phone" :show-overflow-tooltip="true"/>
      <el-table-column label="土地位置" align="center" prop="landLocation" :show-overflow-tooltip="true"/>
      <el-table-column label="主体权属" align="center" prop="ownership" :show-overflow-tooltip="true"/>
      <el-table-column label="土地现状" align="center" prop="landStatus" :show-overflow-tooltip="true"/>
      <el-table-column label="土地面积" align="center" prop="acreage" :show-overflow-tooltip="true"/>
      <el-table-column label="出租期限" align="center" prop="allottedTime" :show-overflow-tooltip="true"/>
      <el-table-column label="发包价格" align="center" prop="contractPrice" :show-overflow-tooltip="true"/>
      <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat"/>
      <el-table-column label="创建时间" align="center" prop="created" width="100">
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


      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['land:edit']"
          >修改
          </el-button>
          <el-button
            v-if="scope.row.status ==1"
            size="mini"
            type="text"
            icon="el-icon-success"
            @click="handlePass(scope.row)"
            v-hasPermi="['land:past']"
          >通过审核
          </el-button>
          <el-button
            v-if="scope.row.status ==1||scope.row.status==3"
            size="mini"
            type="text"
            icon="el-icon-close"
            @click="handleClose(scope.row)"
            v-hasPermi="['land:back']"
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
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="输入姓名"/>
        </el-form-item>

        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone" placeholder="输入手机号码"min="11" max="11"/>
        </el-form-item>

        <el-form-item label="土地位置" prop="landLocation">
          <v-distpicker :province="temp.address__province" :city="temp.address__city" :area="temp.address__dist"
                        @selected="onSelected"></v-distpicker>
        </el-form-item>

        <el-form-item label="详细地址" prop="detailedAddress">
          <el-input v-model="form.detailedAddress" placeholder="输入详细地址"/>
        </el-form-item>


       <!-- <el-form-item label="主体权属" prop="ownership">
          <el-input v-model="form.ownership" placeholder="输入主体权属"/>
        </el-form-item>-->

        <el-form-item label="主体权属" prop="ownership">
          <template>
            <el-select v-model="form.ownership" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>

        <el-form-item label="土地现状" prop="landStatus">
          <template>
            <el-select v-model="form.landStatus" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>

        <el-form-item label="土地面积" prop="acreage">
          <el-input v-model="form.acreage" placeholder="输入土地面积"/>
        </el-form-item>

        <el-form-item label="出租期限" prop="allottedTime">
          <el-input v-model="form.allottedTime" placeholder="输入出租期限"/>
        </el-form-item>


        <el-form-item label="发包价" prop="contractPrice">
          <el-input type="number" v-model="form.contractPrice" placeholder="输入发包价"/>
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
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，最多只能上传5张</div>
        </el-upload>
        </el-form-item>
      <!--  <el-form-item label="图片上传" prop="image">
          <el-upload
            ref="my-upload"
            :action="uploadImgUrl"
            list-type="picture-card"
            :limit=4
            v-model="form.image"
            :file-list="form.moreImage"
            :on-preview="handlePictureCardPreview"
            :on-success="handleSuccess"
            :on-remove="handleRemove">

            <img  v-for="more in form.moreImage "v-if="vis" :src="more" style="height: 145px;width: 143px;">

            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
  import {listLand, insertLand, updateLand,getLand,delLand,backLand,delPass} from "@/api/selling/land";



  export default {
    components: {VDistpicker},
    name: "Dict",
    data() {
      return {
        options: [{
          value: '私有个体土地',
          label: '私有个体土地'
        }, {
          value: '农垦农场土地',
          label: '农垦农场土地'
        }, {
          value: '镇村集体土地',
          label: '镇村集体土地'
        },
          {
            value: '转包转让土地',
            label: '转包转让土地'
          },],
        value: '',
        options1: [{
          value: '单纯空地',
          label: '单纯空地'
        }, {
          value: '种有作物',
          label: '种有作物'
        },
          ],
        value: '',
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        temp: {
          address__province: '',
          address__city: '',
          address__dist: '',
        },
        dialogImageUrl: '',
        dialogVisible: false,
        //上传的图片服务器地址
        uploadImgUrl: process.env.VUE_APP_BASE_API + "/image/imageUpload", // 上传的图片服务器地址
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
          name: [
            {required: true, message: "姓名不能为空", trigger: "blur"}
          ],
          images: [
            {required: true, message: "图片不能为空", trigger: "blur"}
          ],
          landLocation: [
            {required: true, message: "土地位置不能为空", trigger: "blur"}
          ],
          detailedAddress: [
            {required: true, message: "详细地址不能为空", trigger: "blur"}
          ],
          ownership: [
            {required: true, message: "主体权属不能为空", trigger: "blur"}
          ],
          landStatus: [
            {required: true, message: "土地现状不能为空", trigger: "blur"}
          ],
          acreage: [
            {required: true, message: "土地面积不能为空", trigger: "blur"}
          ],
          allottedTime: [
            {required: true, message: "出租期限不能为空", trigger: "blur"}
          ],
          contractPrice: [
            {required: true, message: "发包价格不能为空", trigger: "blur"}
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
        listLand(this.queryParams).then(response => {

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
          images: []
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
        this.title1 = "添加土地出租";
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
        this.$nextTick(()=>{
          this.$refs['my-upload'].clearFiles();
        })
        this.vis=true;
        const landId = row.id
        getLand(landId).then(response => {

          this.form = response.result;
          console.log(this.form.moreImage)
          let imgs = []
          this.form.moreImage.forEach((item)=>{
            imgs.push({url:item})
          })
          console.log(imgs,"回显")
          this.form.moreImage = imgs
          if (response.result.landLocation != null && response.result.landLocation != '') {
            const list = response.result.landLocation.split('-')
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
              // let img =''
              // this.form.image.forEach((item)=>{
              //   img =img+item
              // })
              //
              // console.log(img, "上传格式")
              let upload = {
                id:this.form.id,
                caption:this.form.caption,
                name:this.form.name,
                phone:this.form.phone,
                landLocation:this.form.landLocation,
                detailedAddress:this.form.detailedAddress,
                ownership:this.form.ownership,
                landStatus:this.form.landStatus,
                acreage:this.form.acreage,
                allottedTime:this.form.allottedTime,
                contractPrice:this.form.contractPrice,
                images:this.form.images

              }
              updateLand(upload).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                } else {
                  this.msgError(response.msg);
                }
              });
            } else {
              // let img =''
              // this.form.image.forEach((item)=>{
              //   img =img+item
              // })

              // console.log(img, "上传格式")
              let upload = {
                caption:this.form.caption,
                name:this.form.name,
                phone:this.form.phone,
                landLocation:this.form.landLocation,
                detailedAddress:this.form.detailedAddress,
                ownership:this.form.ownership,
                landStatus:this.form.landStatus,
                acreage:this.form.acreage,
                allottedTime:this.form.allottedTime,
                contractPrice:this.form.contractPrice,
                images:this.form.images

              }
              insertLand(upload).then(response => {
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
          return delLand(dictIds);
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
          return delPass(dictIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("审核成功");
        }).catch(function () {
        });
      },
      //驳回审核
      handleClose(row) {
        const dictIds = row.id || this.ids;
        this.$confirm('是否确认驳回"' + dictIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return backLand(dictIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("驳回成功");
        }).catch(function () {
        });
      },
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
   /*   handleRemove(file, fileList) {
        console.log(file, fileList);
      },

      handlePictureCardPreview(file) {
        console.log("111111"+file.result);
        this.image = file.result;

      },
      handleSuccess(file) {
       // console.log("22222222"+JSON.stringify(file));
        this.form.image = file.result;
        this.vis = false;
        this.$message.success('图片上传成功');

       /!* let images = this.form.image;
        console.log(this.form.image)
        images.push(file.result)
        console.log(images,"上传图片")
        this.form.image = images
        this.vis = false;
        this.$message.success('图片上传成功');*!/

      },*/

      onSelected(data) {
        this.temp.address__province = data.province.value
        this.temp.address__city = data.city.value
        this.temp.address__dist = data.area.value
        this.form.landLocation = this.temp.address__province +"-"+ this.temp.address__city +"-"+ this.temp.address__dist
      }



    }
  };
</script>
