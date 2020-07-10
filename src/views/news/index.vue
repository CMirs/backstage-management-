<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="100px"	>
      <el-form-item label="新闻类别" prop="pid">
        <el-select
          v-model="queryParams.pid"
          placeholder="新闻类别"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in category"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
   <!--  <el-form-item label="批发市场地址" prop="marketAddress">
        <el-input
          v-model="queryParams.marketAddress"
          placeholder="请输入批发市场地址"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->

    <!--  <el-form-item label="创建时间">
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
          v-hasPermi="['news:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['news:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['news:remove']"
        >删除</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="purchaseList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" :show-overflow-tooltip="true" />
      <el-table-column label="pid" align="center" prop="pid" :show-overflow-tooltip="true" />
      <el-table-column label="标题" align="center" prop="title" :show-overflow-tooltip="true" />
      <el-table-column label="作者" align="center" prop="author" :show-overflow-tooltip="true" />
      <el-table-column label="专题小类" align="center" prop="name" :show-overflow-tooltip="true" />
      <el-table-column label="是否置顶" align="center" prop="top" :formatter="statusFormat"/>

      <el-table-column label="时间" align="center" prop="time" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.time) }}</span>
        </template>
      </el-table-column>



      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['news:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['news:remove']"
          >删除</el-button>
          <el-button
            size="mini"
            v-if="scope.row.status==4"
            type="text"
            icon="el-icon-refresh-right"
            @click="purchaseRestore(scope.row)"
            v-hasPermi="['purchase:remove']"
          >还原</el-button>

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
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" maxlength="50" show-word-limit="" />
        </el-form-item>

        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" placeholder="请输入作者名称" maxlength="20" show-word-limit="" />
        </el-form-item>


        <el-form-item label="是否置顶：" prop="top"  v-if="noTap===0">
          <el-radio-group v-model="form.top"  >
            <el-radio :label="0">不置顶</el-radio>
            <el-radio :label="1" disabled>置顶</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否置顶：" prop="top"  v-else>
          <el-radio-group v-model="form.top" >
            <el-radio :label="0">不置顶</el-radio>
            <el-radio :label="1" >置顶 </el-radio>
          </el-radio-group>
        </el-form-item>



        <el-form-item label="专题小类" prop="pid">
          <el-select v-model="form.pid"  placeholder="请选择">
            <el-option
              v-for="pile in piles"
              :key="pile.dictValue"
              :label="pile.name"
              :value="pile.pid"

            />
          </el-select>
        </el-form-item>

        <el-form-item label="市场" prop="market" v-if="(form.pid==5||form.pid==6)">
          <el-select v-model="form.market" placeholder="请选择" >
            <el-option
              v-for="dict in marketOptions"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="图片上传" prop="images">
          <el-upload
            ref="my-upload3"
            class="upload-demo"
            :action="uploadImgUrl"
            :on-preview="handlePreview"
            :limit=3
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="form.moreImage"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，最多上传3张</div>
          </el-upload>
        </el-form-item>

     <!--   <el-form-item label="图片上传" prop="image">
          <el-upload
            :action="uploadImgUrl"
            list-type="picture-card"
            :limit=3
            v-model="form.image"
            :on-preview="handlePictureCardPreview"
            :on-success="handleSuccess"
            :on-remove="handleRemove">

            <img v-if="vis" :src="form.image" style="height: 145px;width: 143px;">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>-->
        <el-form-item label="内容" prop="content">
        <quill-editor ref="text" v-model="form.content" class="myQuillEditor" :options="editorOption" />
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
  import { quillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillRedefine} from 'vue-quill-editor-upload'//引入图片上传
  import { listPineapple, addPineapple, listcategory, getItem,deletePineapple,updatePineapple,getTopCount,getMarketList } from "@/api/news/pineapplenews";

  export default {
    name: "Purchase",
    data() {
      return {
        imgQuality: 0.5, //压缩图片的质量
        noTap:1,//置顶字段
        marketOptions: [],//市场
        topNum:"",//置顶条数
        piles:[],
        content: '',     //富文本字段
        editorOption: {}, //富文本
        dialogImageUrl: '',
        dialogVisible: false,
        //上传的图片服务器地址
        uploadImgUrl: process.env.VUE_APP_BASE_API + "/image/imageUpload", // 上传的图片服务器地址
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
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
        // 状态数据字典
        category: [],
        // 日期范围
        dateRange: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,

        },
        // 表单参数
        form: {images:[],pid:null},
        // 表单校验
        rules: {
          market: [
        { required: true, message: "市场不能为空", trigger: "blur" }
      ],
          content: [
            { required: true, message: "内容不能为空", trigger: "blur" }
          ],
          top: [
            { required: true, message: "是否置顶选项不能为空", trigger: "blur" }
          ],
          pid: [
            { required: true, message: "专题小类不能为空", trigger: "blur" }
          ],
          author:[
            { required: true, message: "作者名字不能为空", trigger: "blur" }
          ],
          title: [
            { min: 13, max: 50, message: '长度在 13 到 50 个字符', trigger: 'blur' },
            { required: true, message: "标题不能为空", trigger: "blur" }
          ]
          // images: [
          //   { required: true, message: "图片不能为空", trigger: "blur" }
          // ]
        }
      };
    },
    created() {
      this.getMarket();
      this.getList();
      this.getFeiLei();
      this.getDicts("top_status").then(response => {
        this.statusOptions = response.data;
      });
      this.getDicts("news_category").then(response => {
        this.category = response.data;
      });

      this.editorOption = quillRedefine(//修改富文本编辑器图片上传路径
        {
          // 图片上传的设置
          uploadConfig: {
            action: this.uploadImgUrl,  // 必填参数 图片上传地址
            methods: 'POST',  // 可选参数 图片上传方式  默认为post
            name: 'file',  // 可选参数 文件的参数名 默认为img
            accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',  // 可选参数 可上传的图片格式
            res: (response) => {
              console.log("response",response)
              return response.result;//return图片url
            }
          }
        })

    },
    components: {
      quillEditor,
      quillRedefine
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
    // noClick(){
    //   console.log("ewrtyre4ergffresyryer")
    //
    //   this.msgError("当前已有最大置顶数")
    // },
      //市场选择
      getMarket() {
        this.loading = true;
        getMarketList().then(response => {
          this.marketOptions = response.result
          this.loading = false;
        })
      },

      getPid(s){
        console.log(s,"gfdsfgdfsgfgf")
      },
      /** 查询字典类型列表 */
      getList() {
        this.loading = true;
        listPineapple(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
            this.purchaseList =  (response.result.list);

           // console.log("shuhsush"+JSON.stringify(this.purchaseList));
            this.total =response.result.total;
            this.loading = false;
          }
        );
      },
      getFeiLei() {
        this.loading = true;
        listcategory().then(response => {
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
          marketAddress: null,
          status: null,
          images:[],
          pid:null
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
        this.noTap=1
        this.$nextTick(()=>{
          this.$refs['my-upload3'].clearFiles();
          this.reset();

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
        const id = row.id || this.ids
        let _this =this
        getItem(id).then(response => {
          console.log(response,"data")
            //判断当前打开的是否置顶
          if(response.result.top==0){

            getTopCount(response.result.pid).then(response => {
              _this.topNum= response.result;
              console.log(response.result,'置顶条数')
              if( _this.topNum==2){
                _this.noTap=0
                console.log(_this.noTap)
              }
            });
          }else{
            _this.noTap=1
          }


          this.form = response.result;
          console.log(this.form,"freyetrewtew")

          let imgs = []
          this.form.moreImage.forEach((item)=>{
            imgs.push({url:item})
          })
          console.log(imgs,"回显")
          this.form.moreImage = imgs
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
              getTopCount(this.form.pid).then(response => {
                this.topNum= response.result;
                if (this.topNum<=2||this.form.top==0 ){
                  if (this.form.images.length==1||this.form.images.length==3){

                    let upload = {
                      id:this.form.id,
                      pid:this.form.pid,
                      title:this.form.title,
                      name:this.form.name,
                      top:this.form.top,
                      content:this.form.content,
                      images:this.form.images,
                      market:this.form.market,
                      author:this.form.author

                    }
                    updatePineapple(upload).then(response => {
                      if (response.code === 200) {
                        this.msgSuccess("修改成功");
                        this.open = false;
                        this.getList();
                      } else {
                        this.msgError(response.msg);
                      }
                    });
                  }else {
                    if(this.form.images.length>0){
                      this.msgSuccess("请上传一张或三张图片");
                    }else{
                      this.msgSuccess("请上传图片");
                    }
                  }
                } else {
                  this.msgSuccess("置顶次数超出");
                }
              });

            }else {
              getTopCount(this.form.pid).then(response => {
             this.topNum= response.result;
                console.log(this.topNum,"222")

                  console.log(this.topNum,"333")
                  if (this.topNum<=1 || this.form.top==0){
                    if (this.form.images.length==1||this.form.images.length==3){
                    console.log(this.topNum,"444")
                    let upload = {
                      pid:this.form.pid,
                      title:this.form.title,
                      name:this.form.name,
                      top:this.form.top,
                      content:this.form.content,
                      images:this.form.images,
                      market:this.form.market,
                      author:this.form.author

                    }
                    addPineapple(upload).then(response => {
                      if (response.code === 200) {
                        this.msgSuccess("新增成功");
                        this.open = false;
                        this.getList();
                      } else {
                        this.msgError(response.msg);
                      }
                    });
                  } else {
                      if(this.form.images.length>0){
                        this.msgSuccess("请上传一张或三张图片");
                      }else{
                        this.msgSuccess("请上传图片");
                      }
                    }

                }else {
                    this.msgSuccess("置顶次数超出");
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
          return deletePineapple(id);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
      },

      //图片上传
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
        console.log(response.result,this.form.images,"3a")

        this.form.images.push(response.result)
        console.log(this.form.images,"新增")
      },

    /*  handleRemove(file, fileList) {
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
      }*/
    }
  };
</script>
