<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="70px">

      <el-form-item label="id" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="手机号码" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号码"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="会员身份" prop="state">
        <el-select
          v-model="queryParams.state"
          placeholder="会员身份"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in stateOptions"
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
          v-hasPermi="['member:add']"
        >新增
        </el-button>
      </el-col>
     <!-- <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['member:edit']"
        >修改
        </el-button>
      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="danger"-->
      <!--          icon="el-icon-delete"-->
      <!--          size="mini"-->
      <!--          :disabled="multiple"-->
      <!--          @click="handleDelete"-->
      <!--          v-hasPermi="['purchase:remove']"-->
      <!--        >删除-->
      <!--        </el-button>-->
      <!--      </el-col>-->
    </el-row>

    <el-table v-loading="loading" :data="memberList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="id" align="center" prop="id"/>
      <el-table-column label="用户名" align="center" prop="username" width="120"/>
      <el-table-column label="性别" align="center" prop="sex"/>
      <el-table-column label="手机号码" align="center" prop="phone" width="120"/>
      <el-table-column label="地址" align="center" prop="address" :show-overflow-tooltip="true"/>
      <el-table-column label="会员身份" align="center" prop="stateName"/>
      <el-table-column label="会员状态" align="center" prop="statusName"/>
      <el-table-column label="创建时间" align="center" prop="created" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.created) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center" prop="updated" width="180">
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
            v-hasPermi="['member:edit']"
          >修改
          </el-button>
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            v-if="scope.row.status!=4"-->
          <!--            type="text"-->
          <!--            icon="el-icon-delete"-->
          <!--            @click="handleDelete(scope.row)"-->
          <!--            v-hasPermi="['purchase:remove']"-->
          <!--          >删除-->
          <!--          </el-button>-->
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
    <el-dialog :title="title1" :visible.sync="open" width="700px">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" maxlength="16" minlength="2" show-word-limit/>
        </el-form-item>
        <!--        <el-form-item label="设置密码" prop="password">-->
        <!--          <el-input type="password"  v-model="form.password" placeholder="请设置密码" minlength="6"/>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="确认密码" prop="password2">-->
        <!--          <el-input  type="password"  v-model="form.password2" placeholder="请确认密码" minlength="6"/>-->
        <!--        </el-form-item>-->
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="会员状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label=1>启用</el-radio>
            <el-radio label=2>停用</el-radio>
            <el-radio label=3>重置身份</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号码" maxlength="11"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"/>
        </el-form-item>

        <el-form-item label="头像" prop="file">
          <el-upload ref="my-upload"
                     :action="uploadImgUrl"
                     list-type="picture-card"
                     v-model="form.file"
                     :limit='1'
                     :on-preview="handlePictureCardPreview"
                     :on-success="handleSuccess"
                     :on-remove="handleRemove">
            <img v-if="vis" :src="form.file" style="height: 145px;width: 143px;">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="地址" prop="province">
          <v-distpicker :province="temp.address__province" :city="temp.address__city" :area="temp.address__dist"
                        @selected="onSelected"></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailedAddress">
          <el-input v-model="form.detailedAddress" placeholder="请输入详细地址" maxlength="50"/>
        </el-form-item>

        <el-form-item label="备注" prop="description">
          <el-input type="textarea" v-model="form.description" placeholder="请输入备注" maxlength="100" show-word-limit/>
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
  import { addMember, getMemberById, listMember, updateMember } from '@/api/member/member'

  import VDistpicker from 'v-distpicker'

  export default {
    name: 'Member',
    components: { VDistpicker },
    data() {
      return {
        temp: {
          address__province: '广东省',
          address__city: '湛江市',
          address__dist: '徐闻县'
        },
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        flag:1,
        vis: false,
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        // 字典表格数据
        memberList: [],
        stateOptions:[],
        // 弹出层标题
        title1: '',
        // 是否显示弹出层
        uploadImgUrl: process.env.VUE_APP_BASE_API + '/image/imageUpload', // 上传的图片服务器地址
        open: false,
        // 日期范围
        dateRange: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          marketAddress: null
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          username: [
            { required: true, message: '用户名不能为空或该用户名已被注册', trigger: 'blur' }
          ],
          phone: [
            {
              required: true,
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: '请输入正确的手机号码',
              trigger: 'blur', remote: '/member/phone'
            }
          ],
          // password: [
          //   {required: true, message: "密码不能为空", trigger: "blur"}
          // ],
          // password2: [
          //   {required: true, message: "确认密码错误", trigger: "blur", equalTo: "password"}
          // ],
          email: [
            { required: false, email: true, message: '邮箱错误' }
          ],
          sex: [
            { required: true, message: '性别不能为空', trigger: 'blur' }
          ],
          area: [
            { required: true, message: '请选择地区区域', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getList(),
        this.getDicts("member_status").then(response => {
          this.stateOptions = response.data;
        });
    },
    methods: {
      getList() {
        this.loading = true
        listMember(this.queryParams).then(response => {
            this.memberList = response.result.list
            this.total = response.result.total
            this.loading = false
          }
        )
      },
      // 取消按钮
      cancel() {
        this.open = false
        this.reset()
      },
      // 表单重置
      reset() {
        this.temp = {
          address__province: '广东省',
          address__city: '湛江市',
          address__dist: '徐闻县'
        },
          this.form = {
            sex: '男',
            status: '1'
          }
        if (this.flag == 2) {
          this.$refs['my-upload'].clearFiles()
        }
        this.resetForm('form')
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
        this.title1 = '添加会员'
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
        const id = row.id || this.ids
        getMemberById(id).then(response => {
          this.form = response.result
          if (response.result.status == 0) {
            this.form.status = '2'
          } else {
            this.form.status = '1'
          }
          if (response.result.address != null || response.result.address != '') {
            const list = response.result.address.split(' ')
            this.temp.address__province = list[0]
            this.temp.address__city = list[1]
            this.temp.address__dist = list[2]
          }
          this.open = true
          this.title1 = '修改会员'
        })
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.form.receiveAddress = this.temp.address__province + ' ' + this.temp.address__city + ' ' + this.temp.address__dist
            if (this.form.id != null) {
              updateMember(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('修改成功')
                  this.open = false
                  this.getList()
                } else {
                  this.msgError(response.message)
                }
              })
            } else {
              addMember(this.form).then(response => {
                console.log(response, 'response')
                if (response.code === 200) {
                  this.msgSuccess('新增成功')
                  this.open = false
                  this.getList()
                } else {
                  this.msgError(response.message)
                }
              })
            }
          }
        })
      },
      onSelected(data) {
        this.temp.address__province = data.province.value
        this.temp.address__city = data.city.value
        this.temp.address__dist = data.area.value
      },
      handleRemove(file, fileList) {
        this.form.file = null
      },
      handlePictureCardPreview(file) {
        this.form.file = file.result
      },
      handleSuccess(file) {
        this.form.file = file.result
        this.vis = false
        this.flag=2
      }
    }
  }
</script>
