package com.example.demo.model.service;

import com.example.demo.model.vo.MemoVO;

import java.util.List;
import java.util.Map;

public interface MemoService {
    List<MemoVO> selectMemoList(Map<String, Object> map);
    boolean insertMemo(MemoVO memoVO);
    Map<String, Object> deleteMemo(Map<String, Object> map);

}
