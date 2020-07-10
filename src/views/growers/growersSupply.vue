<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="80px">

      <el-form-item label="id" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="联系人" prop="growersName">
        <el-input
          v-model="queryParams.growersName"
          placeholder="请输入联系人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系电话" prop="growersPhone">
        <el-input
          v-model="queryParams.growersPhone"
          placeholder="请输入联系电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>


      <el-form-item label="供应品种" prop="varieties">
        <el-select v-model="queryParams.varieties" size="small">
          <el-option
            v-for="dict in varietiesOptions"
            :key="dict.name"
            :label="dict.name"
            :value="dict.name"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="种植基地" prop="areaBase">
        <el-select v-model="queryParams.areaBase" filterable size="small">
          <el-option
            v-for="dict in areaBaseOptions"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="status">
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
          v-hasPermi="['growers:add']"
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
          v-hasPermi="['growers:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['growers:remove']"
        >删除
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="growersList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="id" align="center" prop="id" width="50px"/>
      <el-table-column label="联系人" align="center" prop="growersName" width="80px"/>
      <el-table-column label="联系人电话" align="center" prop="growersPhone" width="110px"/>
      <el-table-column label="镇区基地" align="center" prop="areaBaseName" width="110px"/>
      <el-table-column label="商品图片" align="center" height="10px">
        <template slot-scope="scope">
          <img slot="reference" :src="scope.row.image" :alt="scope.row.image"
               style="max-height: 50px;max-width: 130px">
        </template>
      </el-table-column>
      <el-table-column label="价格" align="center" prop="itemPrice" width="110px"/>
      <el-table-column label="品种" align="center" prop="varieties" :show-overflow-tooltip="true"/>
      <el-table-column label="供应数量(亩)" align="center" prop="num" :show-overflow-tooltip="true"/>
      <el-table-column label="属性" align="center" prop="attr" :show-overflow-tooltip="true"/>
      <el-table-column label="供应地址" align="center" prop="addr" :show-overflow-tooltip="true"/>
      <el-table-column label="预收产量(公斤)" align="center" prop="advanceNum" width="80"/>
      <el-table-column label="预收时间" align="center" prop="advanceDate" width="80"/>
      <el-table-column label="截止时间" align="center" prop="stopDate" width="100"/>
      <el-table-column label="创建时间" align="center" prop="created" width="100"/>
      <el-table-column label="订单状态" align="center" prop="status" :formatter="statusFormat"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['purchase:edit']"
          >修改
          </el-button>
          <el-button
            v-if="scope.row.status ==0"
            size="mini"
            type="text"
            icon="el-icon-success"
            @click="handlePass(scope.row)"
            v-hasPermi="['growers:pass']"
          >审核通过
          </el-button>
          <el-button
            v-if="scope.row.status ==0"
            size="mini"
            type="text"
            icon="el-icon-circle-close"
            @click="handleFail(scope.row)"
            v-hasPermi="['growers:fail']"
          >审核不通过
          </el-button>
          <el-button
            v-if="scope.row.status ==1"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['growers:remove']"
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
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" maxlength="20" show-word-limit/>
        </el-form-item>
        <el-form-item label="果农姓名" prop="growersName">
          <el-input v-model="form.growersName" placeholder="请输入果农姓名" maxlength="10"/>
        </el-form-item>
        <el-form-item label="果农电话" prop="growersPhone">
          <el-input v-model="form.growersPhone" placeholder="请输入果农电话" maxlength="11"/>
        </el-form-item>
        <el-form-item label="供应数量/亩" prop="num">
          <el-input v-model="form.num" placeholder="请输入供应数量/亩"/>
        </el-form-item>
        <el-form-item label="预收产量/斤" prop="advanceNum">
          <el-input-number v-model="form.advanceNum" placeholder="请输入预收产量/斤"/>
        </el-form-item>
        <el-form-item label="菠萝品种" prop="varieties">
          <el-select
            v-model="form.varieties"
            filterable
            placeholder="请选择菠萝品种"
            clearable
            size="small"
            style="width: 240px;height: 40px "
          >
            <el-option
              v-for="dict in varietiesOptions"
              :key="dict.name"
              :label="dict.name"
              :value="dict.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="镇区基地" prop="areaBase">
          <el-select
            v-model="form.areaBase"
            filterable
            placeholder="请选择镇区基地"
            clearable
            size="small"
            style="width: 240px"
            @change="getGrowersCoo()"
          >
            <el-option
              v-for="dict in areaBaseOptions"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="合作社" prop="growersCoo">
          <el-select
            v-model="form.growersCoo"
            filterable
            placeholder="请选择合作社"
            clearable
            size="small"
            style="width:240px"
          >
            <el-option
              v-for="dict in growersCooOptions"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="种植地址" prop="province">
          <v-distpicker :province="form.provinces" :city="form.city" :area="form.area"
                        @selected="onSelected"></v-distpicker>
        </el-form-item>
        <el-form-item label="供货详细地址" prop="streetName">
          <el-input v-model="form.streetName" placeholder="请输入供货详细地址" maxlength="20" show-word-limit/>
        </el-form-item>

        <el-form-item label="属性" prop="attr" >
          <el-select
            v-model="form.attWeight"
            placeholder="大小"
            clearable
            size="small"
            style="width:100px"
          >
            <el-option
              v-for="dict in attWeightOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
              :value="dict.dictValue"
            />
          </el-select>
          <el-select
            v-model="form.attFruit"
            placeholder="尺寸"
            clearable
            size="small"
            style="width: 100px"
          >
            <el-option
              v-for="dict in attFruitOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
              :value="dict.dictValue"
            />
          </el-select>
          <el-select
            v-model="form.attColors"
            placeholder="颜色"
            clearable
            size="small"
            style="width: 100px"
          >
            <el-option
              v-for="dict in attColorsOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
              :value="dict.dictValue"
            />
          </el-select>
          <el-select
            v-model="form.attRipe"
            placeholder="成熟度"
            clearable
            size="small"
            style="width: 100px"
          >
            <el-option
              v-for="dict in attRipeOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="是否面谈" prop="isInterview">
          <el-radio v-model="form.isInterview" label=2>是</el-radio>
          <el-radio v-model="form.isInterview" label=1>否</el-radio>
        </el-form-item>

        <el-form-item label="行情价格" v-if="form.isInterview==1" prop="price">
          <el-input-number v-model="form.price" :min="0.1" placeholder="行情价格(元)"/>
          <el-select
            v-model="form.unit"
            filterable
            placeholder="单位"
            clearable
            size="small"
            style="width: 80px"
          >
            <el-option
              v-for="dict in unitOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="预收月份" prop="advanceDate">
          <el-date-picker
            v-model="form.advanceDate"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="交易截止时间" prop="stopDate">
          <el-date-picker
            v-model="form.stopDate"
            type="date"
            value-format="yyyy-MM-dd"
            :picker-options="expireTimeOption"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="供应图片" prop="images">
          <el-upload
            ref="my-upload3"
            class="upload-demo"
            :action="uploadImgUrl"
            :on-preview="handlePreview"
            :multiple="true"
            :limit=5
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="form.moreImage"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">最多上传5张图片</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="品质说明要求" prop="remark">
          <el-input type="textarea" v-model="form.detail" placeholder="请输入品质说明要求" maxlength="200" show-word-limit/>
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
  import { listAllArea } from '@/api/growers/baseArea'
  import { listAllGrowersCoo } from '@/api/growers/growersCoo'
  import { getVarietiesList } from '@/api/carpool/carpool'
  import {
    addGrowers,
    deleteGrowers,
    failGrowersSupply,
    getGrowersById,
    listGrowers,
    passGrowersSupply,
    updateGrowers
  } from '@/api/growers/growers'
  import VDistpicker from 'v-distpicker'

  export default {
    name: 'Growers',
    components: { VDistpicker },
    data() {
      return {
        expireTimeOption: {
          disabledDate(date) {
            return date.getTime() <= Date.now()
          }
        },
        imgQuality: 0.5, //压缩图片的质量
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        vis: false,
        flag:1,
        // 总条数
        total: 0,
        // 字典表格数据
        growersList: [],
        // 弹出层标题
        title1: '',
        // 是否显示弹出层
        open: false,
        uploadImgUrl: process.env.VUE_APP_BASE_API + '/image/imageUpload', // 上传的图片服务器地址
        // 状态数据字典
        statusOptions: [],
        varietiesOptions: [],
        attWeightOptions: [],
        attFruitOptions: [],
        attColorsOptions: [],
        areaBaseOptions: [],
        growersCooOptions: [],
        attRipeOptions: [],
        unitOptions: [],
        // 日期范围
        dateRange: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          varieties: null,
          areaBase: null,
          id: null,
          status: null,
          growersName: null,
          growersPhone: null

        },
        // 表单参数
        form: {
          provinces: '广东省',
          city: '湛江市',
          area: '徐闻县',
          isInterview: '1',
          images: []
        },
        // 表单校验
        rules: {
          area: [
            { required: true, message: '地区不能为空', trigger: 'blur' }
          ],
          varieties: [
            { required: true, message: '品种不能为空', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '数量不能为空', trigger: 'blur' }
          ],
          advanceDate: [
            { required: true, message: '预收时间不能为空', trigger: 'blur' }
          ],
          stopDate: [
            { required: true, message: '交易截止时间不能为空', trigger: 'blur' }
          ],
          streetName: [
            { required: true, message: '供货详细地址不能为空', trigger: 'blur' }
          ],
          growersName: [
            { required: true, message: '果农姓名不能为空', trigger: 'blur' }
          ],
          growersPhone: [
            {
              required: true,
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: '请输入正确的手机号码',
              trigger: 'blur'
            }
          ],
          areaBase: [
            { required: true, message: '镇区基地不能为空', trigger: 'blur' }
          ],
          isInterview: [
            { required: true, message: '是否面谈不能为空', trigger: 'blur' }
          ],
          advanceNum: [
            { required: true, message: '预收产量不能为空', trigger: 'blur' }
          ],
          attWeight: [
            { required: true, message: '属性大小不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getList()
      this.getVarieties()
      this.getAreaBase()
      // this.getGrowersCoo();
      this.getDicts('growers_status').then(response => {
        this.statusOptions = response.data
      })
      this.getDicts('growers_unit').then(response => {
        this.unitOptions = response.data
      })
      this.getDicts('varieties_att_weight').then(response => {
        this.attWeightOptions = response.data
      })
      this.getDicts('varieties_att_fruit').then(response => {
        this.attFruitOptions = response.data
      })
      this.getDicts('varieties_att_colors').then(response => {
        this.attColorsOptions = response.data
      })
      this.getDicts('varieties_att_ripe').then(response => {
        this.attRipeOptions = response.data
      })

    },
    methods: {
      getList() {
        this.loading = true
        listGrowers(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
            this.growersList = response.result.list
            this.total = response.result.total
            this.loading = false
          }
        )
      },
      //  //对图片进行压缩
      dataURItoBlob(dataURI, type) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: type});
      },
      beforeUpload(param) {
        const imgSize = param.size / 1024 / 1024
        console.log(imgSize)
        if(imgSize > 1) {
          const _this = this
          return new Promise(resolve => {
            const reader = new FileReader()
            const image = new Image()
            image.onload = (imageEvent) => {
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              const width = image.width * _this.imgQuality
              const height = image.height * _this.imgQuality
              canvas.width = width;
              canvas.height = height;
              context.clearRect(0, 0, width, height);
              context.drawImage(image, 0, 0, width, height);
              const dataUrl = canvas.toDataURL(param.type);
              const blobData = _this.dataURItoBlob(dataUrl, param.type);
              console.log(blobData)
              console.log(blobData.size / 1024 / 1024)
              resolve(blobData)
              console.log(blobData)
            }
            reader.onload = (e => { image.src = e.target.result; });
            reader.readAsDataURL(param);
          })
        }
      },
      //品种选择
      getVarieties() {
        getVarietiesList().then(response => {
          this.varietiesOptions = response.result
        })
      },
      //基地选择
      getAreaBase() {
        listAllArea().then(response => {
          this.areaBaseOptions = response.result
        })
      },
      // 字典状态字典翻译
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.status)
      },
      //合作社选择
      getGrowersCoo() {
        console.log(1111)
        if (this.form.areaBase == null || this.form.areaBase == '' || this.form.areaBase == undefined) {
          this.msgError('请选选择镇区基地')
        }
        listAllGrowersCoo(this.form.areaBase).then(response => {
          this.growersCooOptions = response.result
        })
      },
      // 取消按钮
      cancel() {
        this.open = false
        this.reset()
      },
      // 表单重置
      reset() {
        this.vis = false,
          this.form = {
            varieties: null,
            status: null,
            images: [],
            attWeight: null,
            attFruit: null,
            attColors: null,
            attRipe: null,
            areaBase: null,
            growersCoo: null,
            unit: null,
            provinces: '广东省',
            city: '湛江市',
            area: '徐闻县',
            isInterview: '2'
          }
        if (this.flag == 2) {
          this.$refs['my-upload3'].clearFiles()
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
        this.form.growersCoo = null
        this.reset()

        this.open = true
        this.title1 = '添加供应单'
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
        getGrowersById(id).then(response => {
          this.form = response.result
          let imgs = []
          this.form.images.forEach((item) => {
            imgs.push({ url: item })
          })
          this.form.moreImage = imgs
          this.form.unit = response.result.unit.toString()
          this.form.isInterview = response.result.isInterview.toString()
          this.open = true
          this.title1 = '修改供应单'
        })
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if(this.form.attWeight==null||this.form.attWeight==''||this.form.attWeight==undefined){
              this.msgError('属性大小不能为空')
              return;
            }
            if(this.form.provinces=='省'){
              this.msgError('请选择省份')
              return;
            }
            if(this.form.city=='市'){
              this.msgError('请选择市')
              return;
            }
            if(this.form.area=='区'){
              this.msgError('请选择区')
              return;
            }
            if (this.form.id != null) {
              updateGrowers(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('修改成功')
                  this.open = false
                  this.getList()
                } else {
                  this.msgError(response.message)
                }
              })
            } else {
              addGrowers(this.form).then(response => {
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

      /** 下架按钮操作 */
      handleDelete(row) {
        const id = row.id || this.ids
        this.$confirm('是否确认删除编号为"' + id + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return deleteGrowers(id)
        }).then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        }).catch(function() {
        })
      },
      /** 通过按钮操作 */
      handlePass(row) {
        const id = row.id
        this.$confirm('是否确认审核通过编号为"' + id + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return passGrowersSupply(id)
        }).then(() => {
          this.getList()
          this.msgSuccess('审核通过')
        }).catch(function() {
        })
      },
      /** 不通过按钮操作 */
      handleFail(row) {
        const id = row.id
        this.$confirm('是否确认审核不通过编号为"' + id + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return failGrowersSupply(id)
        }).then(() => {
          this.getList()
          this.msgSuccess('审核不通过')
        }).catch(function() {
        })
      },
      onSelected(data) {
        this.form.provinces = data.province.value
        this.form.city = data.city.value
        this.form.area = data.area.value
      },
      handleRemove(file, fileList) {
        if (this.form.id) {
          let s = []
          fileList.forEach((item) => {
            if (item.url) {
              s.push(item.url)
            }
          })
          this.form.images = s
        } else {
          let s = []
          fileList.forEach((item) => {
            if (item.response.result) {
              s.push(item.response.result)
            }
          })
          this.form.images = s
        }
      },
      handlePreview(file) {
      },
      handleSuccess(response, file, fileList) {
        this.form.images.push(response.result)
        this.flag=2
      }
    }
  }
</script>
