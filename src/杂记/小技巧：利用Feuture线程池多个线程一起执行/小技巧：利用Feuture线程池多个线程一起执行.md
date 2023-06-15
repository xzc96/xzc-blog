# 小技巧：利用Feuture线程池多个线程一起执行

```java
private List<DbjdSyTjVo> getZgTjjg(SyTjDTO dto, List<String> corpIdList) throws ExecutionException, InterruptedException {
        List<DbjdSyTjVo> tjjgList;
        // 拿到线程池，两个线程同时进行统计
        ExecutorService executor = Executors.newFixedThreadPool(2);
        Future<List<DbjdSyTjVo>> futureA = executor.submit(
                () -> zxjdxxMapper.listSyZgjdTjA(dto.getKssj(), dto.getJssj(), corpIdList));
        Future<List<DbjdSyTjVo>> futureF = executor.submit(
                () -> zxjdxxMapper.listSyZgjdTjF(dto.getKssj(), dto.getJssj(), corpIdList));
        // 组装两次的结果
        tjjgList = futureA.get();
        tjjgList.addAll(futureF.get());
        return tjjgList;
    }
```

futureF.get()会阻塞等待结果的返回
