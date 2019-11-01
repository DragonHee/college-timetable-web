package com.example.demo.controller;


import com.example.demo.model.service.MemoService;
import com.example.demo.model.vo.MemoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/memo")
public class MemoController {
    @Autowired
    private MemoService memoService;

    @RequestMapping(value = "/get", method = RequestMethod.POST)
    public List<MemoVO> getMemo(String classCode) {
        Map<String, Object> map = new HashMap<>();

        map.put("classCode", classCode);
        return memoService.selectMemoList(map);
    }

    @RequestMapping(value = "/put", method = RequestMethod.POST)
    public MemoVO writeMemo(String classCode, String memoTitle, String memoContent) {
        MemoVO memoVO = new MemoVO(classCode, memoTitle, memoContent);
        return memoService.insertMemo(memoVO) ? memoVO : null;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public Map<String, Object> deleteMemo(String memoId) {
        Map<String, Object> map = new HashMap<>();
        map.put("memoId", memoId);
        return memoService.deleteMemo(map);
    }

}
