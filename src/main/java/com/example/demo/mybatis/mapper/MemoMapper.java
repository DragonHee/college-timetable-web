package com.example.demo.mybatis.mapper;

import com.example.demo.model.vo.MemoVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper
public interface MemoMapper {
    List<MemoVO> selectAllMemo();
    List<MemoVO> selectMemo(Map<String, Object> map);
    int writeMemo(MemoVO memoVO);
    int deleteMemo(Map<String, Object> map);
}
