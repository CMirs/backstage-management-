<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">

      <el-form-item label="id" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入商品id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="商品状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="商品状态"
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
          v-hasPermi="['item:add']"
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
          v-hasPermi="['item:edit']"
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
          v-hasPermi="['item:remove']"
        >删除
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="itemList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="商品id" align="center" prop="id"/>
      <el-table-column label="商品标题" align="center" prop="title"/>
      <el-table-column label="商品图片" align="center" height="10px">
        <template slot-scope="scope">
          <img slot="reference" :src="scope.row.image" :alt="scope.row.image"
               style="max-height: 50px;max-width: 130px">
        </template>
      </el-table-column>
      <!--<el-table-column label="商品卖点" align="center" prop="sellPoint" :show-overflow-tooltip="true"/>-->
      <el-table-column label="商品价格" align="center" prop="amount"/>
      <el-table-column label="所属分类" align="center" prop="cname"/>
      <el-table-column label="商品属性" align="center" prop="attr"/>
      <!--<el-table-column label="库存" align="center" prop="num"/>-->
      <!--<el-table-column label="限购数量" align="center" prop="limitNum"/>-->
      <el-table-column label="商品成交量" align="center" prop="volume"/>
      <el-table-column label="商品的浏览数" align="center" prop="pv"/>
      <!--<el-table-column label="详情" align="center" prop="detail" :show-overflow-tooltip="true" />-->
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
            v-if="scope.row.status ==0"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleStart(scope.row)"
            v-hasPermi="['item:publish']"
          >发布
          </el-button>
          <el-button
            v-if="scope.row.status ==1"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleStop(scope.row)"
            v-hasPermi="['item:done']"
          >下架
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['item:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['item:remove']"
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

    <!-- 添加或修改商品对话框 -->
    <el-dialog :title="title1" :visible.sync="open" width="750px">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="商品标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入商品标题" maxlength="50" show-word-limit/>
        </el-form-item>

        <el-form-item label="商品分类" prop="cid">
          <treeselect
            v-model="form.cid"
            :options="menuOptions"
            :show-count="true"
            placeholder="选择商品分类"
          />
        </el-form-item>
        <el-form-item label="活动时间" prop="avtivityTime" >
        <el-date-picker clearable size="small" style="width: 200px"

                        v-model="form.avtivityStartTime"

                        type="datetime"

                        value-format="yyyy-MM-dd HH:mm:ss"

                        placeholder="活动开始时间">

        </el-date-picker>
        <el-date-picker clearable size="small" style="width: 200px"

                        v-model="form.activityEndTime"

                        type="datetime"

                        value-format="yyyy-MM-dd HH:mm:ss"

                        placeholder="活动结束时间">

        </el-date-picker>
        </el-form-item>
        <el-form-item label="商品成交量" prop="volume">
          <el-input-number v-model="form.volume" placeholder="请设置商品成交量" :min="100"/>
        </el-form-item>
        <el-form-item label="商品浏览量" prop="pv">
          <el-input-number v-model="form.pv" placeholder="请设置商品浏览量" :min="100"/>
        </el-form-item>

        <el-form-item label="商品属性" prop="attr">
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
        </el-form-item>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="商品规格 (点击可折叠)" name="1">

            <div v-for="(item, index) in form.itemSize" :key="index">
              <el-row>
                <el-col :span="12">
              <el-form-item label="规格名称" :prop="'itemSize.' + index + '.name'"
                            :rules="{
            required: true, message: '规格名称不能为空', trigger: 'blur'
        }">
                <el-input v-model="item.name" placeholder="请输入规格名称" maxlength="50" show-word-limit/>
              </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="活动价格" :prop="'itemSize.' + index + '.showPrice'">
                    <el-input-number v-model="item.showPrice" :min="0.1" placeholder="单价(元)"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="原价" :prop="'itemSize.' + index + '.price'"
                                :rules="{
            required: true, message: '单价不能为空', trigger: 'blur'
        }">
                    <el-input-number v-model="item.price" :min="0.1" placeholder="单价(元)"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="单位" :prop="'itemSize.' + index + '.units'"
                                :rules="{
            required: true, message: '单位不能为空', trigger: 'blur'
        }">
                    <el-input v-model="item.units" placeholder="请输入单位" maxlength="5" style="width: 200px"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="库存" :prop="'itemSize.' + index + '.num'"
                                :rules="{
            required: true, message: '库存不能为空', trigger: 'blur'
        }">
                    <el-input-number v-model="item.num" :min="1000" placeholder="库存"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="限购" :prop="'itemSize.' + index + '.limitNum'"
                  >
                    <el-input-number v-model="item.limitNum" :min="0" placeholder="默认不限购"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <i class="el-icon-delete" @click="deleteItem(item, index)"></i>
              </el-form-item>
            </div>
            <el-button @click="addItem" type="primary">添加商品规格</el-button>

          </el-collapse-item>

        </el-collapse>

        <!--<el-form-item label="商品价格" prop="price">-->
        <!--<el-input v-model="form.price" placeholder="请输入商品价格" />-->
        <!--</el-form-item>-->
        <el-form-item label="商品图片" prop="images">
          <!--     -->
          <el-upload
            ref="my-upload"
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
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input type="textarea" v-model="form.sellPoint" placeholder="请输入商品卖点" maxlength="200" show-word-limit/>
        </el-form-item>
        <el-form-item label="商品详情" prop="detail">
          <quill-editor ref="text" v-model="form.detail" class="myQuillEditor" :options="editorOption"  placeholder="请输入商品详情"/>
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
  import {
    addItem,
    delItem,
    exportItem,
    getItem,
    listItem,
    startItem,
    stopItem,
    updateItem
  } from '@/api/product/item/index'
  import { treeselect } from '@/api/product/category/index'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import IconSelect from '@/components/IconSelect'
  import { quillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillRedefine} from 'vue-quill-editor-upload'//引入图片上传
  export default {
    name: 'Item',
    components: { Treeselect, IconSelect, quillEditor,quillRedefine },
    data() {
      return {
        imgQuality: 0.5, //压缩图片的质量
        activeNames: ['1'],
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        flag:1,
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        // 商品表格数据
        itemList: [],
        // 分类树选项
        menuOptions: [],
        editorOption: {}, //富文本
        // 日期范围
        dateRange: [],
        statusOptions: [],
        attWeightOptions: [],
        attFruitOptions: [],
        attColorsOptions: [],
        uploadImgUrl: process.env.VUE_APP_BASE_API + '/image/imageUpload', // 上传的图片服务器地址
        // 弹出层标题
        title1: '',
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          status: '1'
        },
        // 表单参数
        form: {
          images: []
          , itemSize: [],
          name: '',
          price: '',
          units: '',
          num: '',
          limitNum: '',
          avtivityStartTime:'',
          activityEndTime:''
        },
        // 表单校验
        rules: {
          pv: [
            { required: true, message: '商品的浏览数不能为空', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '商品标题不能为空', trigger: 'blur' }
          ],
          sellPoint: [
            { required: true, message: '商品卖点不能为空', trigger: 'blur' }
          ],
          cid: [
            { required: true, message: '商品分类不能为空', trigger: 'blur' }
          ],
          images: [
            { required: true, message: '图片不能为空或图片已达上限', trigger: 'blur' }
          ],
          detail: [
            { required: true, message: '详情不能为空', trigger: 'blur' }
          ],
          volume: [
            { required: true, message: '成交量不能为空', trigger: 'blur' }
          ]

        }
      }
    },
    created() {
      this.getList()
      this.getTreeselect()
      this.getDicts('item_status').then(response => {
        this.statusOptions = response.data
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
      this.editorOption = quillRedefine(//修改富文本编辑器图片上传路径
        {
          // 图片上传的设置
          uploadConfig: {
            action: this.uploadImgUrl,  // 必填参数 图片上传地址
            methods: 'POST',  // 可选参数 图片上传方式  默认为post
            name: 'file',  // 可选参数 文件的参数名 默认为img
            accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',  // 可选参数 可上传的图片格式
            res: (response) => {
              return response.result;//return图片url
            }
          }
        })
    },
    methods: {
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
              resolve(blobData)
            }
            reader.onload = (e => { image.src = e.target.result; });
            reader.readAsDataURL(param);
          })
        }
      },
      /** 查询商品列表 */
      getList() {
        this.loading = true
        listItem(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.itemList = response.result.list
          this.total = response.result.total
          this.loading = false
        })
      },
      /** 查询分类下拉树结构 */
      getTreeselect() {
        treeselect().then(response => {
          this.menuOptions = []
          const menu = { id: 0, label: '主类目', children: [] }
          menu.children = response.data
          this.menuOptions.push(menu)
        })
      },
      addItem() {
        this.form.itemSize.push({
          name: '',
          price: '',
          units: '',
          num: '',
          limitNum: '',
          showPrice:null
        })
      },
      deleteItem(item, index) {
        this.form.itemSize.splice(index, 1)
      },
      // 取消按钮
      cancel() {
        this.open = false
        this.reset()
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          title: null,
          sellPoint: null,
          price: null,
          avtivityStartTime: null,
          activityEndTime: null,
          images: [],
          itemSize: [],
          pv: null,
          status: '1',
          cid: 1184
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
        this.resetForm('queryForm')
        this.handleQuery()
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length != 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset()
        this.open = true
        this.title1 = '添加商品'
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset()
        const id = row.id || this.ids
        getItem(id).then(response => {
          this.form = response.result
          let imgs = []
          this.form.images.forEach((item) => {
            imgs.push({ url: item })
          })
          this.form.moreImage = imgs
          this.open = true
          this.title1 = '修改商品'
        })
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs['form'].validate(valid => {
          if (this.form.cid == 0) {
            this.msgError('请选择商品分类，主目录不可选择')
            return
          }
          if (this.form.itemSize.length <= 0) {
            this.msgError('请添加商品规格')
            return
          }
          if (this.form.attWeight == null || this.form.attWeight == '' || this.form.attWeight == undefined) {
            this.msgError('属性大小不能为空')
            return
          }

          if (valid) {
            if (this.form.id != null) {
              updateItem(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess('修改成功')
                  this.open = false
                  this.getList()
                } else {
                  this.msgError(response.message)
                }
              })
            } else {
              addItem(this.form).then(response => {
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
      handleStop(row) {
        const id = row.id || this.ids
        this.$confirm('是否确认下架编号为"' + id + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return stopItem(id)
        }).then(() => {
          this.getList()
          this.msgSuccess('下架成功')
        }).catch(function() {
        })
      },

      /** 发布按钮操作 */
      handleStart(row) {
        const id = row.id || this.ids
        this.$confirm('是否确认发布编号为"' + id + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return startItem(id)
        }).then(() => {
          this.getList()
          this.msgSuccess('发布成功')
        }).catch(function() {
        })
      },

      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids
        this.$confirm('是否确认删除商品编号为"' + ids + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return delItem(ids)
        }).then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        }).catch(function() {
        })
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
