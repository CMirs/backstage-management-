<template>
  <div class="app-container">


    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['slideshow:add']"
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
          v-hasPermi="['slideshow:remove']"
        >删除</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="purchaseList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" :show-overflow-tooltip="true" />

      <el-table-column label="轮播图位置" align="center" prop="type" width="180"> <template slot-scope="scope">
        <span v-if="scope.row.type == 0">首页</span>
        <span v-if="scope.row.type == 1">产地行情</span>
        <span v-if="scope.row.type == 2">活动</span>
      </template>
      </el-table-column>

      <el-table-column label="轮播图" align="center" height="10px">
        <template slot-scope="scope">
        <!--  <el-popover placement="right" title="" trigger="hover">-->
            <!--            <img :src="scope.row.picture" />-->
            <img slot="reference" :src="scope.row.image" :alt="scope.row.image"
                 style="max-height: 50px;max-width: 130px">
         <!-- </el-popover>-->
        </template>
      </el-table-column>

      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>


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
            v-hasPermi="['slideshow:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['slideshow:remove']"
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
        <el-form-item label="广告位置：">
          <el-select v-model="form.type">
            <el-option
              v-for="type in typeOptions"
              :key="type.value"
              :label="type.label"
              :value="type.value">
            </el-option>
          </el-select>
        </el-form-item>

      <!--  <el-form-item label="">
          <el-radio-group v-model="form.differcedifferentiate">
            <el-radio :label="0">站内</el-radio>
            <el-radio :label="1">站外</el-radio>
          </el-radio-group>
        </el-form-item>-->

        <el-form-item label="">
          <el-radio-group v-model="form.productId">
            <el-radio :label="0">下拉路径</el-radio>
            <el-radio :label="1">自定义路径</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="自定义路径" v-if="form.productId==1" prop="url">
          <el-input v-model="form.url" placeholder="/news/pages/news?id=692378707486048256&pid=1" />
        </el-form-item>

        <el-form-item label="跳转路径" v-if="form.productId==0"  prop="url">
          <template>
            <el-select v-model="form.url" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>




     <!--   <el-form-item label="阴影颜色" prop="shadow">
          <el-input v-model="form.shadow" placeholder="请输入阴影颜色" />
        </el-form-item>-->

       <!-- <el-form-item label="阴影颜色" prop="shadow">
          <template>
            <el-select v-model="form.shadow" placeholder="请选择阴影颜色">
              <el-option
                v-for="item in shadows"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>-->

        <el-form-item label="背景颜色" prop="background">
          <template>
            <el-select v-model="form.background" placeholder="请选择背景颜色">
              <el-option
                v-for="item in backgroundColors"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>



        <el-form-item label="轮播图" prop="image">
          <el-upload
            ref="my-upload"
            :action="uploadImgUrl"
            list-type="picture-card"
            :limit=1
            v-model="form.image"
            :on-success="handleSuccess"
            :on-remove="handleRemove">

            <img v-if="vis" :src="form.image" style="height: 145px;width: 143px;">
            <i class="el-icon-plus"></i>
          </el-upload>

        </el-form-item>

     <!--   <el-form-item label="背景图片" prop="tradingCertificate">
          <el-upload
            ref="my-upload2"
            :action="uploadImgUrl"
            list-type="picture-card"
            :limit=1
            v-model="form.background"
            :on-preview="handlePictureCardPreview1"
            :on-success="handleSuccess1"
            :on-remove="handleRemove1">

            <img v-if="vis" :src="form.background" style="height: 145px;width: 143px;">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>-->





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
  import { listLunBo, addLunBo, listcategory, getLunBoItem,deleteLunBo,updateLunBo,startLunBo } from "@/api/app/slideshow";
  const defaultTypeOptions = [
    {
      label: '首页轮播',
      value: 0
    },
    {
      label: '产地轮播',
      value: 1
    }
  ];

  export default {
    name: "Purchase",
    data() {
      return {
        options: [{
          value: '/news/pages/news ',
          label: '新闻资讯'
        }, {
          value: '/quotation/pages/quotation',
          label: '菠萝行情'
        }, {
          value: '/placeSaleList/pages/placeMainList',
          label: '产地买卖'
        },
          {
            value: '/detail/pages/substitute_page',
            label: '一件代发'
          },
          {
            value: '/carpooling/pages/carpooling_page',
            label: '拼车拼团'
          },
          {
            value: '/fruitGrower/pages/fruitGrower',
            label: '供应大厅'
          }, {
            value: '/purchase/pages/my_purchase',
            label: '采购大厅'
          },],
        value: '',

        shadows: [{
          value: '0px 12rpx 46rpx 0px #aec2f2',
          label: '蓝色阴影'
        },
          {
            value: '0px 12rpx 46rpx 0px #f2cdae',
            label: '橘黄'
          },
          {
            value: '0px 12rpx 46rpx 0px #f3e6ae',
            label: '菠萝黄'
          }, ],
        value: '',

        backgroundColors: [{
          value: 'linear-gradient( #1ea1e9,#1155e2)',
          label: '天空蓝'
        },
          {
            value: 'linear-gradient( #f55600, #f59c00)',
            label: '橘橙色'
          },
          {
            value: 'linear-gradient( #fccd05, #fcbf05)',
            label: '菠萝黄'
          },],
        value: '',

        piles:[],
        typeOptions: Object.assign({}, defaultTypeOptions),
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
        form: {image: null,
          background:null},
        // 表单校验
        rules: {
          url: [
            { required: true, message: "链接不能为空", trigger: "blur" }
          ],


          image: [
            { required: true, message: "图片不能为空", trigger: "blur" }
          ],
          background: [
            { required: true, message: "背景图片不能为空", trigger: "blur" }
          ]
        }
      };
    },
    created() {
      this.getList();
      this.getFeiLei();
      this.getDicts("top_status").then(response => {
        this.statusOptions = response.data;
      });

    },
    components: {
      quillEditor
    },
    methods: {
     //启用轮播图
      handleStatusChange(row) {
        let text = row.status === "0" ? "启用" : "停用";
        this.$confirm('确认要"' + text + '""' + row.id + '"吗?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return startLunBo(row.status,row.id);
        }).then(() => {
          this.msgSuccess(text + "成功");
        }).catch(function() {
          row.status = row.status === "0" ? "1" : "0";
        });
      },
      /** 查询字典类型列表 */
      getList() {
        this.loading = true;
        listLunBo(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
            this.purchaseList =  response.result.list;
            this.total =response.result.total;
            this.loading = false;
          }
        );
      },
      getFeiLei() {
        this.loading = true;
        listcategory().then(response => {
            console.log("shuju"+response);
            this.piles = response.result;
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
          image:null,
          background:null
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
          this.reset();
          this.$refs['my-upload'].clearFiles();

        })
        this.$nextTick(()=>{
          this.reset();
          this.$refs['my-upload2'].clearFiles();

        })

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
        this.$nextTick(()=>{
          this.$refs['my-upload'].clearFiles();
        })
        this.$nextTick(()=>{
          this.reset();
          this.$refs['my-upload2'].clearFiles();

        })
        const id = row.id || this.ids
        getLunBoItem(id).then(response => {
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
              updateLunBo(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                } else {
                  this.msgError(response.msg);
                }
              });
            } else {
              addLunBo(this.form).then(response => {
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
          return deleteLunBo(id);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
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


      handleSuccess(file) {
        // console.log("22222222"+JSON.stringify(file));
        this.form.image = file.result;
        this.vis = false;
        this.$message.success('图片上传成功');
      },

      handleRemove1(file, fileList) {
        console.log(file, fileList);
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
