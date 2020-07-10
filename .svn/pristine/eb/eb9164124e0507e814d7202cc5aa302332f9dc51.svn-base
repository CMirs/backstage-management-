<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="市场名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入市场名字"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="批发市场名字" prop="created">-->
<!--        <el-date-picker clearable size="small" style="width: 200px"-->
<!--          v-model="queryParams.created"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择批发市场名字">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
      <el-form-item label="地区" prop="area">
        <el-input
          v-model="queryParams.area"
          placeholder="请输入地区"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
        <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
        <el-form-item label="十大市场" prop="isRepresentative">
        <el-select v-model="queryParams.isRepresentative" placeholder="请选择是否是十大市场之一" clearable size="small">
          <el-option
            v-for="dict in isRepresentativeOptions"
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
          v-hasPermi="['new:market:add']"
        >新增</el-button>
      </el-col>
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['new:market:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['new:market:remove']"
        >删除</el-button>
      </el-col>
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['new:market:export']"-->
<!--        >导出</el-button>-->
<!--      </el-col>-->
    </el-row>

    <el-table v-loading="loading" :data="marketList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="批发市场名字" align="center" prop="name" />

<!--      <el-table-column label="批发市场名字" align="center" prop="updated" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.updated) }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="地区" align="center" prop="area" />
      <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat" />
      <el-table-column label="是否十大市场" align="center" prop="isRepresentative" :formatter="isRepresentativeFormat" />
      <el-table-column label="创建时间" align="center" prop="created" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.created) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleStatus(scope.row,1)"
            v-hasPermi="['new:market:edit']"
          >停用</el-button>

          <el-button v-if="scope.row.status == 2"
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleStatus(scope.row,2)"
                     v-hasPermi="['new:market:edit']"
          >启用</el-button>

          <el-button v-if="scope.row.isRepresentative == 1"
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleStatus(scope.row,3)"
                     v-hasPermi="['new:market:edit']"
          >取消十大代表</el-button>
          <el-button v-if="scope.row.isRepresentative == 0 && scope.row.status == 1"
                     size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleStatus(scope.row,4)"
                     v-hasPermi="['new:market:edit']"
          >设置为代表</el-button>

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['new:market:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['new:market:remove']"
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

    <!-- 添加或修改批发市场对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="市场名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入批发市场名字" />
        </el-form-item>
        <el-form-item label="地区" prop="area">
          <v-distpicker :province="temp.address__province" :city="temp.address__city" :area="temp.address__dist"
                        @selected="onSelected"></v-distpicker>
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
import { listMarket, getMarket, delMarket,updateStatus, addMarket, updateMarket, exportMarket } from "@/api/market/new/market";

export default {
  components: {VDistpicker},
  data() {
    return {
      temp: {
        address__province: '',
        address__city: '',
        address__dist: '',
      },
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
      // 批发市场表格数据
      marketList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态字典
      statusOptions: [],
      // 是否是十大市场之一(0:否,1是)字典
      isRepresentativeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: undefined,
        created: undefined,
        area: undefined,
        status: undefined,
        isRepresentative: undefined
      },
      // 表单参数
      form: {


      },
      // 表单校验
      rules: {
        name: [
          {required: true, message: "市场名称不能为空", trigger: "blur"}
        ],
        area: [
          {required: true, message: "省市区不能为空", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("market_status").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("isRepresentative").then(response => {
      this.isRepresentativeOptions = response.data;
    });
  },
  methods: {
    /** 查询批发市场列表 */
    getList() {
      this.loading = true;
      listMarket(this.queryParams).then(response => {
        this.marketList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 是否是十大市场之一(0:否,1是)字典翻译
    isRepresentativeFormat(row, column) {
      return this.selectDictLabel(this.isRepresentativeOptions, row.isRepresentative);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        name: undefined,
        created: undefined,
        updated: undefined,
        createBy: undefined,
        updateBy: undefined,
        area: undefined,
        status: undefined,
        isRepresentative: undefined
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
      this.reset();
      this.open = true;
      this.title = "添加批发市场";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMarket(id).then(response => {
        this.form = response.data;
        console.log(response.data)
        if (response.data.area != null && response.data.area != '') {
          const list = response.data.area.split(' ')
          this.temp.address__province = list[0]
          this.temp.address__city = list[1]
          this.temp.address__dist = list[2]
        }
        this.open = true;
        this.title = "修改批发市场";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateMarket(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.message);
              }
            });
          } else {
            addMarket(this.form).then(response => {
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
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除批发市场编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delMarket(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 停用/启用/激活十大代表市场或停用十大代表市场 */
    handleStatus(row,type) {
      const ids = row.id
      this.$confirm('是否确认操作市场编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return updateStatus(ids,type);
        }).then(response => {
          if (response.code === 200){

            this.getList();
            this.msgSuccess(response.msg);
          }else{
            this.msgError(response.msg);
          }
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有批发市场数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportMarket(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
    onSelected(data) {
      this.temp.address__province = data.province.value
      this.temp.address__city = data.city.value
      this.temp.address__dist = data.area.value
      this.form.area = this.temp.address__province +" "+ this.temp.address__city +" "+ this.temp.address__dist
    }
  }
};
</script>
