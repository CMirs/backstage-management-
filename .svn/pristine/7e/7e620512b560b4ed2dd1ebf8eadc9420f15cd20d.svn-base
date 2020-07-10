<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="拼车编码" prop="carpoolCode">
        <el-input
          v-model="queryParams.carpoolCode"
          placeholder="请输入拼车编码"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="市场名称" prop="marketAddress">
        <el-input
          v-model="queryParams.marketAddress"
          placeholder="请输入市场名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="拼车方式" prop="carpoolWay">
        <el-select
          v-model="queryParams.carpoolWay"
          placeholder="拼车方式"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in carpoolWayOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="拼车状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="拼车状态"
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
          v-hasPermi="['carpool:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['carpool:remove']"
        >删除
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="carpoolList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="id" align="center" width="50px" prop="id"/>
      <el-table-column label="拼车编码" align="center" width="170px">
        <template slot-scope="scope">
          <router-link :to="'/carpool/carpool/data/' + scope.row.strCarpoolCode" class="link-type">
            <span>{{ scope.row.strCarpoolCode }}</span>
          </router-link>
        </template>
      </el-table-column>
      <!--      <el-table-column label="标题" align="center" prop="title" :show-overflow-tooltip="true"/>-->
      <!--      <el-table-column label="接货人" align="center" prop="receiverName" :show-overflow-tooltip="true"/>-->
      <!--      <el-table-column label="手机号码" align="center" prop="receiverPhone1" :show-overflow-tooltip="true"/>-->
      <el-table-column label="批发市场" align="center" prop="marketAddress" :show-overflow-tooltip="true"/>
      <el-table-column label="收货地址" align="center" prop="receiveAddress" :show-overflow-tooltip="true"/>
      <el-table-column label="品种" align="center" prop="varietiesName" width="80"/>
      <el-table-column label="拼车数量" align="center" prop="number" width="80"/>
      <!--      <el-table-column label="装载方式" align="center" prop="productGrade" :show-overflow-tooltip="true"/>-->
      <el-table-column label="期望发货时间" align="center" prop="deliveryTime" width="120"/>
      <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true"/>
      <el-table-column label="拼车状态" align="center" prop="status" :formatter="statusFormat"/>
      <el-table-column label="拼车方式" align="center" prop="carpoolWay" :formatter="carpoolWayFormat"/>
      <el-table-column label="创建时间" align="center" prop="created" width="160">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.created) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status <7"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['carpool:edit']"
          >修改
          </el-button>
          <el-button
            v-if="scope.row.status ==1"
            size="mini"
            type="text"
            icon="el-icon-success"
            @click="handlePass(scope.row)"
            v-hasPermi="['carpool:pass']"
          >审核通过
          </el-button>
          <el-button
            v-if="scope.row.status ==1"
            size="mini"
            type="text"
            icon="el-icon-circle-close"
            @click="handleFail(scope.row)"
            v-hasPermi="['carpool:fail']"
          >审核不通过
          </el-button>
          <el-button
            v-if="scope.row.status ==2&&scope.row.carpoolWay!=2"
            size="mini"
            type="text"
            icon="el-icon-s-custom"
            @click="handlePartake(scope.row)"
            v-hasPermi="['carpool:partake']"
          >参与拼团
          </el-button>
          <el-button
            v-if="scope.row.status ==2&&scope.row.carpoolWay !=2"
            size="mini"
            type="text"
            icon="el-icon-circle-check"
            @click="handleSuccessful(scope.row)"
            v-hasPermi="['carpool:success']"
          >拼团成功
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
    <el-dialog :title="title1" :visible.sync="open"  width="600px">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"  maxlength="20"  show-word-limit/>
        </el-form-item>
        <el-form-item label="接货人" prop="receiverName">
          <el-input v-model="form.receiverName" placeholder="请输入接货人" maxlength="10" />
        </el-form-item>
        <el-form-item label="手机号码" prop="receiverPhone1" >
          <el-input v-model="form.receiverPhone1" placeholder="请输入手机号码" maxlength="11" />
        </el-form-item>
        <el-form-item label="接货地址" prop="province">
          <v-distpicker :province="temp.address__province" :city="temp.address__city" :area="temp.address__dist"
                        @selected="onSelected"></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" prop="receiveAddressDetail">
          <el-input v-model="form.receiveAddressDetail" placeholder="请输入详细地址" maxlength="20"  show-word-limit/>
        </el-form-item>
        <el-form-item label="批发市场" prop="marketAddress">
          <el-input v-model="form.marketAddress" placeholder="请输入批发市场"/>
        </el-form-item>
        <el-form-item label="品种" prop="varietiesName">
          <el-select
            v-model="form.varietiesName"
            placeholder="品种"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="dict in varietiesOptions"
              :key="dict.name"
              :label="dict.name"
              :value="dict.name"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="等级" prop="attr">
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

        <el-form-item label="装货方式" prop="lodingWay">
          <el-select
            v-model="form.lodingWay"
            placeholder="装货方式"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="dict in laodingWayOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="拼车数量" prop="number">
          <el-input-number v-model="form.number" placeholder="请输入采购数量"/>
        </el-form-item>

        <el-form-item label="期望发货时间" prop="deliveryTime">
          <el-date-picker
            v-model="form.deliveryTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="品质说明要求" prop="remark">
          <el-input type="textarea" v-model="form.remark" placeholder="请输入品质说明要求" maxlength="200"  show-word-limit/>
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
    addCarpool,
    failCarpool,
    getCarpoolDetail,
    listCarpool,
    passCarpool,
    susCarpool,
    updateCarpool,
    getVarietiesList,
    deleteCarpool
  } from "@/api/carpool/carpool";

  import VDistpicker from 'v-distpicker'

  export default {
    components: {VDistpicker},
    name: "Carpool",
    data() {
      return {
        temp: {
          address__province: '广东省',
          address__city: '湛江市',
          address__dist: '徐闻县',
        },

        num: 1,
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
        // 字典表格数据
        carpoolList: [],
        // 弹出层标题
        title1: "",
        // 是否显示弹出层
        open: false,
        // 状态数据字典
        varietiesOptions:[],
        carpoolWayOptions: [],
        laodingWayOptions:[],
        statusOptions: [],
        attWeightOptions: [],
        attFruitOptions: [],
        attColorsOptions: [],
        attRipeOptions: [],
        // 日期范围
        dateRange: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          carpoolCode: null,
          marketAddress: null,
        },
        // 表单参数
        form: {receiveAddress: null,
        },
        // 表单校验
        rules: {
          receiverName: [
            {required: true, message: "收货人不能为空", trigger: "blur"}
          ],
          receiverPhone1: [
            {required: true,
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: "请输入正确的手机号码",
              trigger: "blur"}
          ],
          number: [
            {required: true, message: "采购数量不能为空", trigger: "blur"}
          ],
          lodingWay: [
            {required: true, message: "装载方式不能为空", trigger: "blur"}
          ],
          deliveryTime: [
            {required: true, message: "期望发货时间不能为空", trigger: "blur"}
          ],
          title: [
            {required: true, message: "标题不能为空", trigger: "blur"}
          ],
          receiveAddressDetail: [
            {required: true, message: "收货详细地址不能为空", trigger: "blur"}
          ],
          area: [
            {required: true, message: "请选择地区区域", trigger: "blur"}
          ]
        }
      };
    },
    created() {
      this.getList();
      this.getVarieties();
      this.getDicts("carpool_status").then(response => {
        this.statusOptions = response.data;
      });
      this.getDicts("carpool_way").then(response => {
        this.carpoolWayOptions = response.data;
      });
      this.getDicts("laoding_way").then(response => {
        this.laodingWayOptions = response.data;
      });
      this.getDicts("varieties_att_weight").then(response => {
        this.attWeightOptions = response.data;
      });
      this.getDicts("varieties_att_fruit").then(response => {
        this.attFruitOptions = response.data;
      });
      this.getDicts("varieties_att_colors").then(response => {
        this.attColorsOptions = response.data;
      });
      this.getDicts("varieties_att_ripe").then(response => {
        this.attRipeOptions = response.data;
      });
    },
    methods: {
      /** 查询活动列表 */
      getList() {

        this.loading = true;

        listCarpool(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
            this.carpoolList = response.result.list;
            this.total = response.result.total;
            this.loading = false;
          }
        );
      },

      //品种选择
      getVarieties(){
        getVarietiesList().then(response => {
          this.varietiesOptions = response.result;
        });
      },

      // 字典状态字典翻译
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.status);
      },
      // 字典状态字典翻译
      carpoolWayFormat(row, column) {
        return this.selectDictLabel(this.carpoolWayOptions, row.carpoolWay);
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.temp= {
          address__province: '广东省',
            address__city: '湛江市',
            address__dist: '徐闻县',
        },
        this.form = {
          carpoolCode: null,
          marketAddress: null,
          carpoolWay: null,
          status: null,
          attWeight: '',
          attFruit: '',
          attColors: '',
          attRipe: ''
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
        this.form.carpoolWay=3;
        this.title1 = "添加拼车订单";
      },
      /** 参与拼车按钮操作 */
      handlePartake(row) {
        this.reset();
        this.form.carpoolCode = row.strCarpoolCode
        this.form.carpoolWay=2;
        this.open = true;
        this.title1 = "参与拼车订单";
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
        const id = row.id || this.ids
        getCarpoolDetail(id).then(response => {
          this.form = response.result;
          this.form.lodingWay=response.result.lodingWay.toString();
          this.form.carpoolCode =response.result.strCarpoolCode;
          if (response.result.receiveAddress != null || response.result.receiveAddress != '') {
            const list = response.result.receiveAddress.split(' ')
            this.temp.address__province = list[0]
            this.temp.address__city = list[1]
            this.temp.address__dist = list[2]
          }

          this.open = true;
          this.title1 = "修改拼车单";
        });
      },
      /** 提交按钮 */
      submitForm: function () {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.temp.address__province=='省'){
              this.msgError('请选择省份')
              return;
            }
            if(this.temp.address__city=='市'){
              this.msgError('请选择市')
              return;
            }
            if(this.temp.address__dist=='区'){
              this.msgError('请选择区')
              return;
            }
            if(this.form.attWeight==null||this.form.attWeight==''||this.form.attWeight==undefined){
              this.msgError('属性大小不能为空')
              return;
            }
            this.form.receiveAddress = this.temp.address__province +" "+ this.temp.address__city +" "+ this.temp.address__dist
            if (this.form.id != null) {
              updateCarpool(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                } else {
                  this.msgError(response.message);
                }
              });
            } else {
              addCarpool(this.form).then(response => {
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
      /** 通过按钮操作 */
      handlePass(row) {
        const id = row.id;
        this.$confirm('是否确认审核通过编号为"' + id + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return passCarpool(id);
        }).then(() => {
          this.getList();
          this.msgSuccess("审核通过");
        }).catch(function () {
        });
      },
      /** 不通过按钮操作 */
      handleFail(row) {
        const id = row.id;
        this.$confirm('是否确认审核不通过编号为"' + id + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return failCarpool(id);
        }).then(() => {
          this.getList();
          this.msgSuccess("审核不通过");
        }).catch(function () {
        });
      },

      /** 拼团成功按钮操作 */
      handleSuccessful(row) {
        const id = row.strCarpoolCode ;
        this.$confirm('是否确认拼团成功编号为"' + id + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return susCarpool(id);
        }).then(() => {
          this.getList();
          this.msgSuccess("拼团成功");
        }).catch(function () {
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
          return deleteCarpool(id);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function () {
        });
      },
      onSelected(data) {
        this.temp.address__province = data.province.value
        this.temp.address__city = data.city.value
        this.temp.address__dist = data.area.value
        this.form.receiveAddress = this.temp.address__province +" "+ this.temp.address__city +" "+ this.temp.address__dist
      }
    }
  };
</script>
