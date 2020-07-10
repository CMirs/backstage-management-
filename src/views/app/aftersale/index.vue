<template>
  <div class="app-container">
    <!--  <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="100px">
       &lt;!&ndash; <el-form-item label="批发市场地址" prop="marketAddress">
          <el-input
            v-model="queryParams.marketAddress"
            placeholder="请输入批发市场地址"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>&ndash;&gt;
     &lt;!&ndash;   <el-form-item label="状态" prop="status">
          <el-select
            v-model="queryParams.status"
            placeholder="字典状态"
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
        </el-form-item>&ndash;&gt;
      &lt;!&ndash;  <el-form-item label="创建时间">
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
        </el-form-item>&ndash;&gt;
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>-->

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['aftersale:add']"
        >新增</el-button>
      </el-col>
    <!--  <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['purchase:edit']"
        >修改</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['aftersale:remove']"
        >删除</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="purchaseList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" :show-overflow-tooltip="true" />
      <el-table-column label="qq" align="center" prop="qq" :show-overflow-tooltip="true" />
      <el-table-column label="号码" align="center" prop="phone" :show-overflow-tooltip="true" />
      <!--<el-table-column label="售后条款" align="center" prop="afterSales" :show-overflow-tooltip="true" />-->



      <el-table-column label="创建时间" align="center" prop="created" width="180">
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
            v-hasPermi="['aftersale:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['aftersale:remove']"
          >删除</el-button>
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

        <el-form-item label="qq" prop="qq">
          <el-input  v-model="form.qq" placeholder="" maxlength="20" />
        </el-form-item>

        <el-form-item label="号码" prop="phone">
          <el-input  v-model="form.phone" placeholder="" maxlength="20" />
        </el-form-item>

        <el-form-item label="售后条款" prop="afterSales">
          <quill-editor ref="text" v-model="form.afterSales" class="myQuillEditor" :options="editorOption" />
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
  import { quillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { listAfter, add, listcategory, getItem,deletemessage,update } from "@/api/app/aftersale";

  export default {
    name: "Purchase",
    data() {
      return {
        piles:[],
        radio: "1",
        content: '',     //富文本字段
        editorOption: {}, //富文本
        dialogImageUrl: '',
        dialogVisible: false,
        //上传的图片服务器地址
        uploadImgUrl: process.env.VUE_APP_BASE_API + "/image/imageUpload", // 上传的图片服务器地址
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
        // 字典表格数据
        purchaseList: [],
        //专题分类
        category:[],
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

        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          qq: [
            { required: true, message: "qq不能为空", trigger: "blur" }
          ],
          phone: [
            { required: true, message: "电话不能为空", trigger: "blur" }
          ],

          afterSales: [
            { required: true, message: "售后条款不能为空", trigger: "blur" }
          ],

        }
      };
    },
    created() {
      this.getList();
      this.getDicts("top_status").then(response => {
        this.statusOptions = response.data;
      });

    },
    components: {
      quillEditor
    },
    methods: {
      getPid(s){
        console.log(s,"gfdsfgdfsgfgf")
      },
      /** 查询字典类型列表 */
      getList() {
        this.loading = true;
        listAfter(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
            this.purchaseList =  response.rows;
            this.total =response.total;
            this.loading = false;
          }
        );
      },

      // 字典状态字典翻译
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.top);
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          marketAddress: null,
          status: "4",
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
        this.title1 = "添加";

      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length!=1
        this.multiple = !selection.length
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getItem(id).then(response => {
          this.form = response.result;
          this.open = true;
          this.title1 = "修改";
          this.vis=true;
        });
      },


      /** 提交按钮 */
      submitForm: function() {
        //console.log(this.$refs.text.value)
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              update(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                } else {
                  this.msgError(response.msg);
                }
              });
            } else {
              add(this.form).then(response => {
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

      /** 还原按钮操作 */
      purchaseRestore(row) {
        const id = row.id ;
        this.$confirm('是否确认还原编号为"' + id + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return restorePurchase(id);
        }).then(() => {
          this.getList();
          this.msgSuccess("还原成功");
        }).catch(function() {});
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const id = row.id || this.ids;
        this.$confirm('是否确认删除编号为"' + id + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return deletemessage(id);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
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
      },

      handleRemove1(file, fileList) {
        console.log(file, fileList);
      },

      handlePictureCardPreview1(file) {
        console.log("111111"+file.result);
        this.tradingCertificate = file.result;

      },
      handleSuccess1(file) {
        // console.log("22222222"+JSON.stringify(file));
        this.form.background = file.result;
        this.vis = false;
        this.$message.success('图片上传成功');
      }
    }
  };
</script>
