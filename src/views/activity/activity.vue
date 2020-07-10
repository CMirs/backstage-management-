<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="活动名称" prop="activityName">
        <el-input
          v-model="queryParams.activityName"
          placeholder="请输入活动名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="活动状态"
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
      <el-form-item label="创建时间">
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
          v-hasPermi="['activity:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['activity:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="single"
          @click="handleDelete"
          v-hasPermi="['activity:remove']"
        >删除
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="activityList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="id" align="center" prop="id"/>
      <el-table-column label="活动标题" align="center" prop="title" :show-overflow-tooltip="true"/>
      <el-table-column label="代言品种" align="center" prop="varieties" :show-overflow-tooltip="true"/>
      <el-table-column label="代言图片" align="center" height="10px">
        <template slot-scope="scope">
          <img slot="reference" :src="scope.row.picture" :alt="scope.row.picture"
               style="max-height: 50px;max-width: 130px">
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat"/>
      <el-table-column label="活动开始时间" align="center" prop="startTime" width="180"/>
      <el-table-column label="活动结束时间" align="center" prop="endTime" width="180"/>
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
            v-hasPermi="['activity:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['activity:remove']"
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

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title1" :visible.sync="open" width="600px">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="活动标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入活动标题" maxlength="20" show-word-limit/>
        </el-form-item>
        <el-form-item label="代言品种" prop="varieties">
          <el-input v-model="form.varieties" placeholder="请输入代言品种"/>
        </el-form-item>

        <el-form-item label="活动图片" prop="picture">
          <el-upload ref="my-upload"
                     :action="uploadImgUrl"
                     list-type="picture-card"
                     v-model="form.picture"
                     :limit='1'
                     :on-preview="handlePictureCardPreview"
                     :on-success="handleSuccess"
                     :on-remove="handleRemove">
            <img v-if="vis" :src="form.picture" style="height: 145px;width: 143px;">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip" style="color: blue">只需要上传一张照片</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="活动开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="活动规则" prop="rule">
          <el-input type="textarea" v-model="form.rule" placeholder="请输入活动规则" maxlength="200" show-word-limit/>
        </el-form-item>

        <el-form-item label="一等奖" prop="firstPrize">
          <el-input v-model="form.firstPrize" placeholder="请输入一等奖" maxlength="20" show-word-limit/>
        </el-form-item>
        <el-form-item label="二等奖" prop="secondPrize">
          <el-input v-model="form.secondPrize" placeholder="请输入二等奖" maxlength="20" show-word-limit/>
        </el-form-item>
        <el-form-item label="三等奖" prop="thirdPrize">
          <el-input v-model="form.thirdPrize" placeholder="请输入三等奖" maxlength="20" show-word-limit/>
        </el-form-item>
        <el-form-item label="代言口号" prop="slogan">
          <el-input type="textarea" v-model="form.slogan" placeholder="请输入代言口号" maxlength="40" show-word-limit/>
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
  import { addActivity, delActivity, getActivity, listActivity, updateActivity } from '@/api/activity/activity'

  export default {
    name: 'Activity',
    data() {
      return {
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        vis: false,
        flag:1,
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        // 字典表格数据
        activityList: [],
        // 弹出层标题
        title1: '',
        // 是否显示弹出层
        open: false,
        // 状态数据字典
        statusOptions: [],
        // 日期范围
        dateRange: [],
        //上传的图片服务器地址
        uploadImgUrl: process.env.VUE_APP_BASE_API + '/image/imageUpload',
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          activityName: null,
          activityName: null,
          status: null
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          title: [
            { required: true, message: '活动标题不能为空', trigger: 'blur' }
          ],
          varieties: [
            { required: true, message: '代言品种不能为空', trigger: 'blur' }
          ],
          slogan: [
            { required: true, message: '代言口号不能为空', trigger: 'blur' }
          ],
          startTime: [
            { required: true, message: '开始时间不能为空', trigger: 'blur' }
          ],
          endTime: [
            { required: true, message: '结束时间不能为空', trigger: 'blur' }
          ],
          picture: [
            { required: true, message: '活动图片不能为空', trigger: 'blur' }
          ]

        }
      }
    },
    created() {
      this.getList()
      this.getDicts('activity_status').then(response => {
        this.statusOptions = response.data
      })
    },
    methods: {
      /** 查询活动列表 */
      getList() {
        this.loading = true
        listActivity(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
            this.activityList = response.result.list
            this.total = response.result.total
            this.loading = false
          }
        )
      },
      // 字典状态字典翻译
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.status)
      },
      // 取消按钮
      cancel() {
        this.open = false
        this.reset()
      },
      // 表单重置
      reset() {
        this.form = {
          activityName: null,
          status: null,
        }
        this.resetForm('form')
        if(this.flag==2){
          this.$refs['my-upload'].clearFiles()
        }
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1
        this.getList()
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.dateRange = []
        this.resetForm('queryForm')
        this.handleQuery()
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset()
        this.open = true
        this.form.status = '1',
          this.vis = false
        this.title1 = '添加活动'
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length != 1
        this.multiple = !selection.length
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset()
        this.vis = true
        const activityId = row.id || this.ids
        getActivity(activityId).then(response => {
          this.form = response.result
          this.form.status = response.result.status.toString()
          this.open = true
          this.title1 = '修改活动'
        })
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.form.id != undefined) {
              updateActivity(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('修改成功')
                  this.open = false
                  this.getList()
                } else {
                  this.msgError(response.msg)
                }
              })
            } else {
              addActivity(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('新增成功')
                  this.open = false
                  this.getList()
                } else {
                  this.msgError(response.msg)
                }
              })
            }
          }
        })
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const dictIds = row.dictId || this.ids
        this.$confirm('是否确认删除活动编号为"' + dictIds + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return delActivity(dictIds)
        }).then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        }).catch(function() {
        })
      },
      handleRemove(file, fileList) {
        this.form.picture = null
      },
      handlePictureCardPreview(file) {
        this.form.picture = file.result
      },
      handleSuccess(file) {
        this.form.picture = file.result
        this.vis = false
        this.flag=2
      }
    }
  }
</script>
