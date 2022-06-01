<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-table
          v-loading="listLoading"
          :data="xian"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column label="县部门" align="center" min-width="30">
            <template slot-scope="{ row }">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="总分" align="center" min-width="20">
            <template slot-scope="{ row }">
              <span>{{ row.total }}</span>
            </template>
          </el-table-column>

          <el-table-column label="平均分" align="center" min-width="20">
            <template slot-scope="{ row }">
              <span>{{ row.average.toString().slice(0, 4) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="最高分" align="center" min-width="20">
            <template slot-scope="{ row }">
              <span>{{ row.highest }}</span>
            </template>
          </el-table-column>

          <el-table-column label="最低分" align="center" min-width="20">
            <template slot-scope="{ row }">
              <span>{{ row.lowest }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table
          v-loading="listLoading"
          :data="xiang"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column label="乡镇" align="center" min-width="30">
            <template slot-scope="{ row }">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="总分" align="center" min-width="20">
            <template slot-scope="{ row }">
              <span>{{ row.total }}</span>
            </template>
          </el-table-column>

          <el-table-column label="平均分" align="center" min-width="20">
            <template slot-scope="{ row }">
              <span>{{ row.average.toString().slice(0, 4) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="最高分" align="center" min-width="20">
            <template slot-scope="{ row }">
              <span>{{ row.highest }}</span>
            </template>
          </el-table-column>

          <el-table-column label="最低分" align="center" min-width="20">
            <template slot-scope="{ row }">
              <span>{{ row.lowest }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from "@/api/statis";

export default {
  data() {
    return {
      xian: [],
      xiang: [],
      listLoading: true,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList().then((response) => {
        this.xian = response.data.xian;
        this.xiang = response.data.xiang;
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
  },
};
</script>


<style scoped>
.table {
  padding-left: 10px;
}
</style>