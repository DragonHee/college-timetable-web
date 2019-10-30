package com.example.demo.mybatis.mapper;

import com.example.demo.model.vo.LectureAndMemoVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface LectureMapper {
    List<LectureAndMemoVO> selectAllLecture();
}
