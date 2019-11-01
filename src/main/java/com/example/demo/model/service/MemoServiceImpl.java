package com.example.demo.model.service;

import com.example.demo.model.vo.MemoVO;
import com.example.demo.mybatis.mapper.MemoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MemoServiceImpl implements MemoService{
    @Autowired
    MemoMapper memoMapper;
    @Override
    public List<MemoVO> selectMemoList(Map<String, Object> map) {
        return memoMapper.selectMemo(map);
    }

    @Override
    public boolean insertMemo(MemoVO memoVO) {

        return memoMapper.writeMemo(memoVO) > 0 ? true : false;
    }

    @Override
    public Map<String, Object> deleteMemo(Map<String, Object> map) {
        Map<String, Object> returnMap = new HashMap<>();

        if(memoMapper.deleteMemo(map) > 0) returnMap.put("memoId", map.get("memoId"));
        else returnMap.put("memoId", 0);

        return map;
    }
}
