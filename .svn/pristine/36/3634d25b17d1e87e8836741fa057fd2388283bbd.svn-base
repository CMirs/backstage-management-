<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="品种名称" prop="name">
        <el-select v-model="queryParams.name" size="small">
          <el-option
            v-for="dict in varietiesOptions"
            :key="dict.name"
            :label="dict.name"
            :value="dict.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择状态"
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
          v-hasPermi="['varieties:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['varieties:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['varieties:remove']"
        >删除
        </el-button>
      </el-col>

    </el-row>

    <el-table v-loading="loading" :data="varietiesList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="品种名称" align="center" prop="name" />
      <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat"/>
      <el-table-column label="排列序号" align="center" prop="sortOrder" />
      <el-table-column label="图标" align="center" height="10px">
        <template slot-scope="scope">
            <img slot="reference" :src="scope.row.icon" :alt="scope.row.icon"
                 style="max-height: 50px;max-width: 130px">
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="创建时间" align="center" prop="created" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.created) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updated" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updated) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['varieties:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['varieties:remove']"
          >删除
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

    <!-- 添加或修改采购品种对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="品种名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入品种名称"  maxlength="20" show-word-limit/>
        </el-form-item>
        <el-form-item label="排列序号" prop="sortOrder">
          <el-input-number v-model="form.sortOrder" placeholder="请输入排列序号" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-upload ref="my-upload"
                     :action="uploadImgUrl"
                     list-type="picture-card"
                     v-model="form.icon"
                     :limit='1'
                     :on-preview="handlePictureCardPreview"
                     :on-success="handleSuccess"
                     :on-remove="handleRemove">
            <img v-if="vis" :src="form.icon" style="height: 145px;width: 143px;">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}
            </el-radio>
          </el-radio-group>
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
  import { listVarieties, addVarieties, updateVarieties, getVarieties,deleteVarieties } from "@/api/base/varieties";
  import {getVarietiesList} from "@/api/carpool/carpool";

  export default {
    data() {
      return {
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        flag:1,
        // 非单个禁用
        single: true,
        vis: false,
        // 非多个禁用
        multiple: true,
        // 总条数
        //上传的图片服务器地址
        uploadImgUrl: process.env.VUE_APP_BASE_API + "/image/imageUpload",
        total: 0,
        // 采购品种表格数据
        varietiesList: [],
        varietiesOptions: [],
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
          status: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          name: [
            {required: true, message: "品种名称不能为空或该品种已存在", trigger: "blur"}
          ],
          icon: [
            {required: true, message: "图标不能为空", trigger: "blur"}
          ]
        }
      };
    },
    created() {
      this.getList();
      this.getVarieties();
      this.getDicts("activity_status").then(response => {
        this.statusOptions = response.data;
      });
    },
    methods: {
      /** 查询采购品种列表 */
      getList() {
        this.loading = true;
        listVarieties(this.queryParams).then(response => {
          this.varietiesList = response.result.list;
          this.total =  response.result.total;
          this.loading = false;
        });
      },
      //品种选择
      getVarieties() {
        getVarietiesList().then(response => {
          this.varietiesOptions = response.result;
        });
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
          id: null,
          name: null,
          status:null,
          sortOrder: null,
          icon: null,
          remark: null
        };
        if(this.flag==2){
          this.$refs['my-upload'].clearFiles()
        }
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
        this.reset();
        this.vis = false;
        this.open = true;
        this.form.status='1'
        this.title = "添加采购品种";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        this.vis = true
        const id = row.id || this.ids
        getVarieties(id).then(response => {
          this.form = response.result;
          this.form.status = response.result.status.toString()
          this.open = true;
          this.title = "修改采购品种";
        });
      },

      /** 删除按钮操作 */
      handleDelete(row) {
        const id = row.id || this.ids;
        this.$confirm('是否确认删除编号为"' + id + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return deleteVarieties(id);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function () {
        });
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateVarieties(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                } else {
                  this.msgError(response.message);
                }
              });
            } else {
              addVarieties(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("新增成功");
                  this.open = false;
                  this.getList();
                } else {
                  this.msgError(response.message);
                }
              });
            }
          }
        });
      },
      handleRemove(file, fileList) {
        this.form.icon = null;
      },
      handlePictureCardPreview(file) {
        this.form.icon = file.result;
      },
      handleSuccess(file) {
        this.form.icon = file.result;
        this.vis = false;
        this.flag=2

      }
    }
  };
</script>
