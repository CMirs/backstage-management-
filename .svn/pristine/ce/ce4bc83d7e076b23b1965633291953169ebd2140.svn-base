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
          style="width: 240px"
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
          v-hasPermi="['agricultural:add']"
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
          v-hasPermi="['agricultural:remove']"
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
      <el-table-column label="农资类型" align="center" prop="type" :show-overflow-tooltip="true"/>
      <el-table-column label="品牌名称" align="center" prop="brandName" :show-overflow-tooltip="true"/>
      <el-table-column label="价格范围" align="center" prop="priceScope" :show-overflow-tooltip="true"/>
      <el-table-column label="数量" align="center" prop="number" :show-overflow-tooltip="true"/>
      <el-table-column label="时间" align="center" prop="time" :show-overflow-tooltip="true"/>
      <el-table-column label="运输方式" align="center" prop="transport" :show-overflow-tooltip="true"/>
      <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
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
            v-hasPermi="['agricultural:edit']"
          >修改
          </el-button>
        <!--  <el-button
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
            v-hasPermi="['agricultural:past']"
          >通过审核
          </el-button>
          <el-button
            v-if="scope.row.status ==1||scope.row.status==3"
            size="mini"
            type="text"
            icon="el-icon-close"
            @click="handleBack(scope.row)"
            v-hasPermi="['agricultural:back']"
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

        <el-form-item label="农资类型" prop="type">
          <template>
            <el-select v-model="form.type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>


        <el-form-item label="品牌名称" prop="brandName">
          <el-input v-model="form.brandName" placeholder="输入品牌名称"/>
        </el-form-item>

        <el-form-item label="价格范围" prop="priceScope">
          <el-input  v-model="form.priceScope" placeholder="输入价格范围"/>
        </el-form-item>

        <el-form-item label="数量" prop="number">
          <el-input v-model="form.number" placeholder="输入权属要求"/>
        </el-form-item>

        <el-form-item label="时间" prop="time">
          <el-date-picker
            v-model="form.time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="运输方式" prop="transport">
          <template>
            <el-select v-model="form.transport" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
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
  import {listagricultural, insertagricultural, updateagricultural,getagricultural,delNongZi,passAgricultural,backAgricultural} from "@/api/selling/agricultural";


  export default {
    name: "Dict",
    data() {
      return {
        options: [{
          value: '箩筐',
          label: '箩筐'
        }, {
          value: '菠萝苗',
          label: '菠萝苗'
        }, {
          value: '肥料',
          label: '肥料'
        }],
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
        form: {image:null},
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
          type: [
            {required: true, message: "农资类型不能为空", trigger: "blur"}
          ],
          brandName: [
            {required: true, message: "品牌名称不能为空", trigger: "blur"}
          ],
          priceScope: [
            {required: true, message: "价格范围不能为空", trigger: "blur"}
          ],
          number: [
            {required: true, message: "数量不能为空", trigger: "blur"}
          ],
          time: [
            {required: true, message: "时间不能为空", trigger: "blur"}
          ],
          transport: [
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
      /** 查询列表 */
      getList() {
        listagricultural(this.queryParams).then(response => {

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
        this.reset();
        this.open = true;
        this.title1 = "添加农资";
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
        getagricultural(landId).then(response => {

          this.form = response.result;
          this.open = true;
          this.title1 = "修改";
        });
      },
      /** 提交按钮 */
      submitForm: function () {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != undefined) {
              updateagricultural(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                } else {
                  this.msgError(response.msg);
                }
              });
            } else {
              insertagricultural(this.form).then(response => {
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
          return delNongZi(dictIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function () {
        });
      },
      //通过审核
      handlePass(row) {
        const dictIds = row.id || this.ids;
        this.$confirm('是否确认通过"' + dictIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return passAgricultural(dictIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("通过成功");
        }).catch(function () {
        });
      },
      //驳回审核
      handleBack(row) {
        const dictIds = row.id || this.ids;
        this.$confirm('是否确认驳回"' + dictIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return backAgricultural(dictIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("驳回成功");
        }).catch(function () {
        });
      },
      handleRemove(file, fileList) {
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
      }



    }
  };
</script>
